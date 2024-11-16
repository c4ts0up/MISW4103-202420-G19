const fs = require('fs').promises;
const path = require('path');
const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const { options } = config;

/**
 * Carga las imágenes de una versión de la APB y ejecución específicas
 *
 * @param sutVersion versión de APB
 * @param testName nombre del test e imágenes ejecutadas
 * @returns {Promise<*[]>} promesa de un arreglo de image buffers
 */
async function loadScreenshots(sutVersion, testName) {
    const imageList = [];
    const directoryPath = `./results/${sutVersion}/${testName}`;

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
        await data.buffer()
    ];
}

/**
 * Guarda la comparación de dos imágenes
 * @param buff buffer de la comparación de imágenes
 * @param timestamp timestamp del análisis
 * @param testName nombre de las pruebas para guardar bajo directorio
 * @returns {Promise<void>}
 */
async function saveComparison(
    buff,
    timestamp,
    testName
) {
    const comparisonDirectory = `./results/vr/${timestamp}/${testName}.compare.png`;
    await fs.writeFile(comparisonDirectory, buff);
}

/**
 * Guarda el reporte final creado con HTML/CSS/ResembleJS
 * @param baseVersion versión base de la ABP
 * @param rcVersion versión RC de la ABP
 * @param testName nombre de la prueba a comparar
 * @param timestamp timestamp de la prueba de regresión visual
 * @param report reporte a guardar
 * @returns {Promise<void>}
 */
async function saveReport(
    baseVersion,
    rcVersion,
    testName,
    timestamp,
    report
) {
    const reportDirectory = `./results/vr/${timestamp}/report.html`;
    await fs.writeFile(reportDirectory, report);
    await fs.copyFile('./index.css', `./results/vr/${timestamp}/index.css`);
}


/**
 * Entrypoint del análisis de regresión visual
 * @param baseVersion versión base de la ABP
 * @param rcVersion versión RC de la ABP
 * @param testName nombre de la prueba a comparar
 * @returns {Promise<void>}
 */
async function visualRegressionAnalysis(
    baseVersion,
    rcVersion,
    testName
) {
    const timestamp = new Date().toISOString().replace(/:/g,".");

    // carga las imágenes de ambos
    console.log(`Cargando las imágenes de ${baseVersion}/${testName} ...`);
    const baseScreenshots = await loadScreenshots(baseVersion, testName);
    console.log(`Cargando las imágenes de ${rcVersion}/${testName} ...`);
    const rcScreenshots = await loadScreenshots(rcVersion, testName);

    // compara que las imágenes sean de igual longitud
    if (baseScreenshots.length !== rcScreenshots.length) {
        console.log(`El número de screenshots en ${baseVersion}/${testName} (${baseScreenshots.length}) 
         es distinto al número de screenshots en ${rcVersion}/${testName} (${rcScreenshots.length}`);
        return;
    }

    let resultInfo = [];

    // guarda los datos
    for (let i=0; i<baseScreenshots.length; i++) {
        console.log(`Calculando la regresión visual del screenshot # ${i} ...`);
        let [ results, buffer ] = await visualRegression(baseScreenshots[i], rcScreenshots[i]);
        console.log(`Guardando la regresión visual del screenshot # ${i} ...`);
        await saveComparison(buffer, timestamp, testName);
        resultInfo.push(results);
    }

    console.log(`Creando reporte ...`);
    const report = createReport(testName, resultInfo);
    console.log(`Guardando reporte ...`);
    await saveReport(baseVersion, rcVersion, testName, timestamp, report);
}
(async ()=> console.log(await visualRegressionAnalysis(
    config.sut.baseVersion,
    config.sut.rcVersion,
    config.sut.testName
)))();

function browser(b, info){
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}


function createReport(id, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${id}</p>
            <div id="visualizer">
                ${config.browsers.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}