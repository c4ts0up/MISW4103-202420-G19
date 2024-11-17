const fs = require('fs').promises;
const path = require('path');
const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const { testRunEvidencePath, comparisonImagePath, reportPath, cssPath} = require("./src/utils");
const { browsers, options } = config;
const { createReport } = require('./src/view');

/**
 * Carga las imágenes de una versión de la APB y ejecución específicas
 *
 * @param sutVersion versión de APB
 * @param browserName nombre del navegador donde se ejecuta
 * @param testName nombre del test e imágenes ejecutadas
 * @returns {Promise<*[]>} promesa de un arreglo de image buffers
 */
async function loadScreenshots(sutVersion, browserName, testName) {
    const imageList = [];
    const directoryPath = testRunEvidencePath(sutVersion, browserName, testName);
    console.log(`Cargando las imágenes de ${directoryPath} ...`);

    try {
        // Read all files in the directory asynchronously
        const files = await fs.readdir(directoryPath);

        // Filter and load image files asynchronously
        const imageFiles = files.filter(file => /\.(png)$/i.test(file));

        // Ordenadas en orden de pasos
        imageFiles.sort();

        // Await the reading of each image file and push its buffer into the list
        for (const file of imageFiles) {
            const filePath = path.join(directoryPath, file);
            const imageBuffer = await fs.readFile(filePath); // Asynchronously read the image
            imageList.push(imageBuffer); // Push the image buffer to the list
        }

        return imageList;
    } catch (error) {
        console.error('Error loading images:', error);
        throw error; // Re-throw the error if you need it to be handled elsewhere
    }
}

/**
 * Compara y retorna los resultados de comparar dos imágenes en ResembleJS
 *
 * @returns {Promise<{diffBounds: ({top: *, left: *, bottom: number, right: number}|*), analysisTime: *, isSameDimensions: (boolean|*), rawMisMatchPercentage: *, misMatchPercentage: *, dimensionDifference: *}>} promesa de valores de análisis usados para comparar las imágenes
 * @param imageBase screenshot de ABP en versión base
 * @param imageRc screenshot de ABP en versión RC
 */
async function visualRegression(
    imageBase,
    imageRc
) {
    console.log(`Calculando regresión visual ..`);
    const data = await compareImages(
        imageBase,
        imageRc,
        options
    )

    return [
        {
            isSameDimensions: data.isSameDimensions,
            dimensionDifference: data.dimensionDifference,
            rawMisMatchPercentage: data.rawMisMatchPercentage,
            misMatchPercentage: data.misMatchPercentage,
            diffBounds: data.diffBounds,
            analysisTime: data.analysisTime
        },
        await data.getBuffer()
    ];
}

/**
 * Guarda la comparación de dos imágenes
 * @param buff buffer de la comparación de imágenes
 * @param browserName nombre del navegador donde se ejecutó la prueba
 * @param timestamp timestamp del análisis
 * @param testIdentifier
 * @param screenshotIdentifier
 * @returns {Promise<void>}
 */
async function saveComparison(
    buff,
    browserName,
    timestamp,
    testIdentifier,
    screenshotIdentifier
) {
    console.log(`Guardando la regresión visual del screenshot # ${testIdentifier}/${screenshotIdentifier} ...`);
    await fs.writeFile(comparisonImagePath(
            browserName,
            timestamp,
            testIdentifier,
            `${screenshotIdentifier}.compare.png`
        ),
        buff
    );
}

/**
 * Guarda el reporte final creado con HTML/CSS/ResembleJS
 * @param browserName
 * @param testName nombre de la prueba a comparar
 * @param timestamp timestamp de la prueba de regresión visual
 * @param report reporte a guardar
 * @returns {Promise<void>}
 */
async function saveReport(
    browserName,
    timestamp,
    testName,
    report
) {
    await fs.writeFile(reportPath(browserName, timestamp, testName), report);
    await fs.copyFile('./index.css', cssPath(browserName, timestamp, testName));
}


/**
 * Análisis de regresión visual para un escenario específico
 * @param browserName navegador donde se ejecutó la prueba
 * @param baseVersion versión base de la ABP
 * @param rcVersion versión RC de la ABP
 * @param testName nombre de la prueba a comparar
 * @returns {Promise<void>}
 */
async function visualRegressionAnalysis(
    browserName,
    baseVersion,
    rcVersion,
    testName
) {
    const timestamp = new Date().toISOString().replace(/:/g,".");

    // carga las imágenes de ambos
    const baseScreenshots = await loadScreenshots(baseVersion, browserName, testName);
    const rcScreenshots = await loadScreenshots(rcVersion, browserName, testName);

    // compara que las imágenes sean de igual longitud
    if (baseScreenshots.length !== rcScreenshots.length) {
        console.log(`El número de screenshots en ${baseVersion}/${testName} (${baseScreenshots.length}) 
         es distinto al número de screenshots en ${rcVersion}/${testName} (${rcScreenshots.length}`);
        return;
    }

    let resultInfo = [];

    // guarda los datos
    for (let i=0; i<baseScreenshots.length; i++) {
        let [ results, buffer ] = await visualRegression(baseScreenshots[i], rcScreenshots[i]);
        await saveComparison(buffer, browserName, timestamp, testName, i.toString());
        resultInfo.push(results);
    }

    console.log(`Creando reporte ...`);
    const report = createReport(testName, resultInfo);
    console.log(`Guardando reporte ...`);
    await saveReport(browserName, timestamp, testName, report);
}


/**
 * Entrypoint
 * @returns {Promise<void>}
 */
async function traverseEvidence() {
    for (const b of browsers) {
        console.log(await visualRegressionAnalysis(
            b,
            config.sut.baseVersion,
            config.sut.rcVersion,
            config.sut.testName
        ));
    }
}

(async ()=> console.log(await traverseEvidence()))();
