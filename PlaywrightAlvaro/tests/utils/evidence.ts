/**
 * ## Evidence Utils
 *
 * Archivo de utilidades para la recolección y guardado de evidencias
 */

import {Page} from "playwright";


export async function myScreenshot(
    page: Page,
    screenshotPath: string
) {
    console.log(`Screenshot --> ${screenshotPath}`);

    // fuerza la espera para cargar toda la página
    await page.waitForLoadState("load");

    await page.screenshot({
        path: screenshotPath
    });
}