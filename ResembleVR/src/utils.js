/**
 * ## Utils
 *
 * Utilidades para el manejo de archivos, lectura de evidencias, etc.
 */

const config = require('../config.json');
const fs = require('fs');
const path = require('path');


/**
 * Función base para crear directorios
 * @param directories lista de directorios
 */
function concatanatePaths(directories) {
    return path.join('.', ...directories);
}

/**
 * Path para las evidencias de una ejecución de tests
 * @param sutVersion versión de la ABP
 * @param browserName nombre del navegador usado
 * @param testIdentifier identificador del test
 * @returns string
 */
function testRunEvidencePath(sutVersion, browserName, testIdentifier) {
    return concatanatePaths([
        config.sut.evidence.baseDirectory,
        sutVersion.toString(),
        browserName,
        testIdentifier
    ])
}


/**
 * Path para guardar la imagen de comparación
 * @param browserName nombre del navegador
 * @param timestamp timestamp de la ejecución
 * @param testIdentifier identificador del test
 * @param screenshotIdentifier identificador del screenshot tomado
 * @returns {string | *}
 */
function comparisonImagePath(browserName, timestamp, testIdentifier, screenshotIdentifier) {
    return concatanatePaths([
        config.sut.evidence.targetDirectory,
        browserName,
        timestamp,
        testIdentifier,
        screenshotIdentifier
    ])
}

/**
 * Directorios para construir el path de resultados
 * @param browserName
 * @param timestamp
 * @param testIdentifier
 * @returns {(string|*)[]}
 */
function resultsDirectories(browserName, timestamp, testIdentifier) {
    return [config.sut.evidence.targetDirectory, browserName, timestamp, testIdentifier];
}


/**
 * Path para guardar los resultados
 * @param browserName
 * @param timestamp
 * @param testIdentifier
 * @returns {string | *}
 */
function resultsPath(browserName, timestamp, testIdentifier) {
    return concatanatePaths(resultsDirectories(browserName, timestamp, testIdentifier));
}

function reportPath(browserName, timestamp, testIdentifier) {
    return concatanatePaths([...resultsDirectories(browserName, timestamp, testIdentifier), 'report.html']);
}

function cssPath(browserName, timestamp, testIdentifier) {
    return concatanatePaths([...resultsDirectories(browserName, timestamp, testIdentifier), 'index.css']);
}

module.exports = {
    testRunEvidencePath,
    comparisonImagePath,
    reportPath,
    cssPath,
    resultsPath
}