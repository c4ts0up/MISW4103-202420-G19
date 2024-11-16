const fs = require('fs').promises;
const path = require('path');

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