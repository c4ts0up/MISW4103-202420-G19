/**
 * ## Evidence (utils)
 *
 * Archivo de utilidades para la recolección y guardado de evidencias
 */

import {Page} from "playwright";


export async function myScreenshot(
    page: Page,
    sutVersion: number,
    testName: string,
    step: string
) {
    const ssPath = `./results/${sutVersion}/${testName}/${step}.png`;
    console.log(`Screenshot ${step} --> ${ssPath}`);

    // fuerza la espera para cargar toda la página
    await page.waitForLoadState("load");

    await page.screenshot({
        path: ssPath
    });
}