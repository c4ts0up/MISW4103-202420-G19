const fs = require('fs').promises;
const path = require('path');
const compareImages = require("resemblejs/compareImages");
const config = require("./config.json");
const { resultsPath, testRunEvidencePath, comparisonImagePath, reportPath, cssPath} = require("./src/utils");
const { browsers, options } = config;
const { createReport } = require('./src/view');
const { loadScreenshots, loadEvidenceNames} = require('./src/evidences');

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
    const path = comparisonImagePath(
        browserName,
        timestamp,
        testIdentifier,
        `compare-${screenshotIdentifier}`
    );

    console.log(`Guardando la regresión visual del screenshot # ${path} ...`);
    await fs.writeFile(path, buff);
}

async function saveScreenshot(
    browserName,
    timestamp,
    testIdentifier,
    screenshotIdentifier,
    screenshot
) {
    const path = comparisonImagePath(
        browserName,
        timestamp,
        testIdentifier,
        `${screenshotIdentifier}`
    );

    console.log(`Guardando el screenshot # ${path} ...`);
    await fs.writeFile(path, screenshot);
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
async function analyzeCase(
    browserName,
    baseVersion,
    rcVersion,
    testName
) {
    const timestamp = new Date().toISOString().replace(/:/g,".");

    await fs.mkdir(resultsPath(browserName, timestamp, testName), { recursive: true });

    // carga los nombres de las imágenes en cada uno
    const baseImageNames = await loadEvidenceNames(baseVersion, browserName, testName);
    const rcImageNames = await loadEvidenceNames(rcVersion, browserName, testName);

    // revisa que tengan los mismos elementos
    if (baseImageNames.length !== rcImageNames.length) {
        console.log(`El número de screenshots no coincide`);
        return;
    }

    // revisa los elementos
    baseImageNames.sort();
    rcImageNames.sort();
    for (let i=0; i<baseImageNames.length; i++) {
        if (baseImageNames[i] !== rcImageNames[i]) {
            console.log(`Los nombres de los screenshots no coinciden`);
            return;
        }
    }

    // carga las imágenes de ambos
    const baseScreenshots = await loadScreenshots(baseVersion, browserName, testName, baseImageNames);
    const rcScreenshots = await loadScreenshots(rcVersion, browserName, testName, rcImageNames);

    // guarda los screenshots de prueba
    for (let i=0; i<baseImageNames.length; i++) {
        await saveScreenshot(
            browserName,
            timestamp,
            testName,
            `base-${baseImageNames[i]}`,
            baseScreenshots[i]
        );
        await saveScreenshot(
            browserName,
            timestamp,
            testName,
            `rc-${rcImageNames[i]}`,
            rcScreenshots[i]
        );
    }

    let resultInfo = {};

    // guarda los datos
    for (let i=0; i<baseScreenshots.length; i++) {
        let [ results, buffer ] = await visualRegression(baseScreenshots[i], rcScreenshots[i]);
        await saveComparison(buffer, browserName, timestamp, testName, baseImageNames[i]);
        resultInfo[baseImageNames[i]] = results;
    }

    console.log(`Creando reporte ...`);
    const report = createReport(browserName, testName, resultInfo, baseImageNames);
    console.log(`Guardando reporte ...`);
    await saveReport(browserName, timestamp, testName, report);
}


/**
 * Entrypoint
 * @returns {Promise<void>}
 */
async function analyzeEvidence() {
    for (const b of browsers) {
        console.log(await analyzeCase(
            b,
            config.sut.baseVersion,
            config.sut.rcVersion,
            config.sut.testName
        ));
    }
}

(async ()=> console.log(await analyzeEvidence()))();
