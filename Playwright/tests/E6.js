const playwright = require('playwright');
const LoginPage = require('../pages/loginPage');
const LanguageSettingsPage = require('../pages/languageSettingsPage');
const data = require('../utils/data');
const config = require('../utils/config');

(async () => {

    //------------------------------------------------------------------------------------------
    //                   E6: Cambiar configuración de idioma invalido
    //------------------------------------------------------------------------------------------

    // Lanzar el navegador y crear contexto
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Inicializar las páginas
    const loginPage = new LoginPage(page);
    const languageSettingsPage = new LanguageSettingsPage(page);

    // Login
    console.log('Login');
    await loginPage.navigate(config.baseUrl);
    await loginPage.login(data.login.username, data.login.password, config.scenarioFolderE6);

    // **Given**: Estoy en la página de configuración
    console.log('**Given**: Estoy en la página de configuración');
    await languageSettingsPage.navigate(config.settingsUrl);
    await languageSettingsPage.goToSettings(config.scenarioFolderE6);
    // **And**: Busco la opción de idioma
    console.log('**And**: Busco la opción de idioma');
    await languageSettingsPage.navigate(config.languageSettingsUrl);
    await languageSettingsPage.goToLanguageSettings(config.scenarioFolderE6);

    // **When**: Quiero editar el idioma de publicación
    console.log('**When**: Quiero editar el idioma de publicación');
    await languageSettingsPage.clickEditButton(config.scenarioFolderE6);
    // **And**: Escribo el codigo del idioma valido
    console.log('**And**: Escribo el codigo del idioma valido');
    await languageSettingsPage.changeLanguage(data.language_content_pe5.language, config.scenarioFolderE6);

    // **Then**: El idioma no debería guardarse correctamente
    console.log('**Then**: El botón de actualizar está desahbilitado y el idioma no debería actualizarse correctamente');
    await languageSettingsPage.failUpdateLanguage(config.scenarioFolderE6);

    // Cerrar el navegador
    await browser.close();
})();
