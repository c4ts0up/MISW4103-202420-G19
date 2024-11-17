/**
 * ## Utils
 *
 * Utilidades para el manejo de archivos, lectura de evidencias, etc.
 */

const config = require('../config.json');
const fs = require('fs');

/**
 * Función base para crear directorios
 * @param directories lista de directorios
 */
function concatanatePaths(directories) {
    const dir = "./" + directories.join('/');
    fs.mkdirSync(dir, { recursive: true });
    return dir
}

/**
 * Crea el path para un screenshot
 * @param basePath path base para los screenshots (e.g `./results`)
 * @param version versión de la app (e.g `5.96`)
 * @param browserName nombre del navegador (e.g `chromium`)
 * @param testName nombre de la prueba (e.g `E000 - Mi primera prueba`)
 * @param screenshotIdentifier identificador sin extensión del screenshot (e.g `after`)
 * @returns string path para guardar el screenshot
 */
function screenshotPath(
    basePath,
    version,
    browserName,
    testName,
    screenshotIdentifier
) {
    return concatanatePaths([basePath, version.toString(), browserName, testName, `${screenshotIdentifier}.png`]);
}

function testRunEvidencePath(
    sutVersion,
    browserName,
    testIdentifier
) {
    return concatanatePaths([
        config.sut.evidence.baseDirectory,
        sutVersion,
        browserName,
        testIdentifier
    ])
}


function comparisonImagePath(
    browserName,
    timestamp,
    testIdentifier,
    screenshotIdentifier
) {
    return concatanatePaths([
        config.sut.evidence.targetDirectory,
        browserName,
        timestamp,
        testIdentifier,
        screenshotIdentifier
    ])
}

function reportPath(
    browserName,
    timestamp,
    testIdentifier
) {
    return concatanatePaths([
        config.sut.evidence.targetDirectory,
        browserName,
        timestamp,
        testIdentifier,
        'report.html'
    ])
}

function cssPath(
    browserName,
    timestamp,
    testIdentifier
) {
    return concatanatePaths([
        config.sut.evidence.targetDirectory,
        browserName,
        timestamp,
        testIdentifier,
        'index.css'
    ])
}

module.exports = {
    testRunEvidencePath,
    comparisonImagePath,
    reportPath,
    cssPath
}