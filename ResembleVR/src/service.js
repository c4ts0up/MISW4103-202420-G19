/**
 * ## Service
 *
 * Archivo con la lógica de comparación de imágenes
 */

const compareImages = require("resemblejs/compareImages");
const config = require("../config.json");
const { resembleOptions, pixelmatchOptions } = config;
const {PNG} = require("pngjs");

/**
 * Compara y retorna los resultados de comparar dos imágenes en ResembleJS
 *
 * @returns {Promise<{diffBounds: ({top: *, left: *, bottom: number, right: number}|*), analysisTime: *, isSameDimensions: (boolean|*), rawMisMatchPercentage: *, misMatchPercentage: *, dimensionDifference: *}>} promesa de valores de análisis usados para comparar las imágenes
 * @param imageBase screenshot de ABP en versión base
 * @param imageRc screenshot de ABP en versión RC
 */
async function resembleRegression(
    imageBase,
    imageRc
) {
    console.log(`Calculando regresión visual con ResembleJS ..`);
    const data = await compareImages(
        imageBase,
        imageRc,
        resembleOptions
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
 * Compara y retorna los resultados de comparar dos imágenes en ResembleJS
 *
 * @returns {Promise<{diffBounds: ({top: *, left: *, bottom: number, right: number}|*), analysisTime: *, isSameDimensions: (boolean|*), rawMisMatchPercentage: *, misMatchPercentage: *, dimensionDifference: *}>} promesa de valores de análisis usados para comparar las imágenes
 * @param imageBase screenshot de ABP en versión base
 * @param imageRc screenshot de ABP en versión RC
 * @param width
 * @param height
 */
async function pixelmatchRegression(
    imageBase,
    imageRc,
    width,
    height
) {
    let output = new PNG( { width, height });
    const pixelmatch = await import('pixelmatch').then(mod => mod.default);
    let res = pixelmatch(imageBase, imageRc, output.data, width, height, pixelmatchOptions);
    return [
        output,
        res
    ]
}

module.exports = {
    resembleRegression,
    pixelmatchRegression
}