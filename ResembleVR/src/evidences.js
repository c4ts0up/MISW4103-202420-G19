const {testRunEvidencePath} = require("./utils");
const {promises: fs} = require("fs");
const path = require("path");
const pngjs = require('pngjs');
const { PNG } = pngjs;


/**
 * Carga los nombres de los archivos de prueba a usar
 * @param sutVersion
 * @param browserName
 * @param testName
 * @returns {Promise<string[]>}
 */
async function loadEvidenceNames(sutVersion, browserName, testName) {
    const directoryPath = testRunEvidencePath(sutVersion, browserName, testName);
    console.log(`Cargando los nombres de ${directoryPath} ...`);

    try {
        // Read all files in the directory asynchronously
        const files = await fs.readdir(directoryPath);

        // Filter and load image files asynchronously
        return files.filter(file => /\.(png)$/i.test(file));

    } catch (error) {
        console.error('Error loading images:', error);
        throw error; // Re-throw the error if you need it to be handled elsewhere
    }
}

/**
 * Carga las imágenes de una versión de la APB y ejecución específicas con FS
 *
 * @param sutVersion versión de APB
 * @param browserName nombre del navegador donde se ejecuta
 * @param testName nombre del test e imágenes ejecutadas
 * @param imageNames nombres ordenados de las imágenes a cargar
 * @returns {Promise<*[]>} promesa de un arreglo de image buffers
 */
async function loadEvidenceFS(sutVersion, browserName, testName, imageNames) {
    const imageList = [];
    const directoryPath = testRunEvidencePath(sutVersion, browserName, testName);
    console.log(`Cargando las imágenes de ${directoryPath} con FS ...`);

    try {
        // Await the reading of each image file and push its buffer into the list
        for (const file of imageNames) {
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
 *
 */
/**
 * Carga las imágenes de una versión de la APB y ejecución específicas con PNG
 *
 * @param sutVersion versión de APB
 * @param browserName nombre del navegador donde se ejecuta
 * @param testName nombre del test e imágenes ejecutadas
 * @param imageNames nombres ordenados de las imágenes a cargar
 * @returns {Promise<*[]>} promesa de un arreglo de image buffers
 */
async function loadEvidencePNG(sutVersion, browserName, testName, imageNames) {
    const imageList = [];
    const directoryPath = testRunEvidencePath(sutVersion, browserName, testName);
    console.log(`Cargando las imágenes de ${directoryPath} con PNG ...`);

    try {
        // Await the reading of each image file and push its buffer into the list
        for (const file of imageNames) {
            const filePath = path.join(directoryPath, file);
            const img = await PNG.read(filePath); // Asynchronously read the image
            imageList.push(img); // Push the image buffer to the list
        }

        return imageList;

    } catch (error) {
        console.error('Error loading images:', error);
        throw error; // Re-throw the error if you need it to be handled elsewhere
    }
}

module.exports = {
    loadScreenshots: loadEvidenceFS,
    loadEvidenceNames
}