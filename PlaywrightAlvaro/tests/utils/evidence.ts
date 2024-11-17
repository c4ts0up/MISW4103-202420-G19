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

    await page.screenshot({
        path: ssPath
    });
}