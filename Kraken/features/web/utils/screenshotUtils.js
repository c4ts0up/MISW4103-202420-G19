const fs = require('fs');
const path = require('path');

// Función para tomar la captura de pantalla
async function takeScreenshot(driver, screenshotName, customPath) {
    
    // Ruta base fija del proyecto
    const baseDir = path.resolve(__dirname, '../../../evidences/5.96.0/chromium');
    
    // Ruta completa incluyendo la entrada del usuario
    const finalDir = path.join(baseDir, customPath);

    if (!fs.existsSync(finalDir)) {
        fs.mkdirSync(finalDir, { recursive: true });
    }
    // Ruta del archivo de captura de pantalla
    const screenshotPath = path.join(finalDir, `${screenshotName}.png`);

    // Tomar la captura de pantalla
    const screenshot = await driver.takeScreenshot();

    // Guardar la captura de pantalla en la ruta especificada
    fs.writeFileSync(screenshotPath, screenshot, 'base64');

    console.log(`Screenshot saved at ${screenshotPath}`);
}

module.exports = { takeScreenshot };