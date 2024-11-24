/**
 * ## File Utils
 *
 * Utilidades para el manejo de archivos
 */


import * as path from "node:path";

/**
 * Función base para crear directorios
 * @param directories lista de directorios
 */
function concatanatePaths(directories: string[]) {
    return path.join('.', ...directories);
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
export function screenshotPath(
    basePath: string,
    version: number,
    browserName: string,
    testName: string,
    screenshotIdentifier: string
): string {
    return concatanatePaths([basePath, version.toString(), browserName, testName, `${screenshotIdentifier}.png`]);
}