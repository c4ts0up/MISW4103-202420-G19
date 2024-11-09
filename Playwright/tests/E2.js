const playwright = require('playwright');
const LoginPage = require('../pages/loginPage');
const EditorPage = require('../pages/editorPage');
const data = require('../utils/data');
const config = require('../utils/config');


(async () => {

    //------------------------------------------------------------------------------------------
    //                   E2: Programar una publicación con fecha INvalida
    //------------------------------------------------------------------------------------------

    // Lanzar el navegador y crear contexto
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const editorPage = new EditorPage(page);

    // Login
    console.log('Login');
    await loginPage.navigate(config.baseUrl);
    await loginPage.login(data.login.username, data.login.password, config.scenarioFolderE2);

    // **Given**: Estoy creando una nueva publicación
    console.log('**Given**: Estoy creando una nueva publicación');
    await page.goto(config.editorUrl);
    //**And**: Lleno el titulo y cuerpo de la publicación
    console.log('**And**: Lleno el titulo y cuerpo de la publicación');
    await editorPage.createPost(data.post_content_pe2.title, data.post_content_pe2.content, config.scenarioFolderE2);

    // **When**: Quiero programar la publicación
    console.log('**When**: Quiero programar la publicación');
    await editorPage.beginSchedulePost(config.scenarioFolderE2);
    // **And**: Ingreso una fecha invalida de publicación
    console.log('**And**: Ingreso una fecha invalida de publicación');
    await editorPage.fillScheduleData(data.post_content_pe2.date, data.post_content_pe2.time, config.scenarioFolderE2);
    // **And**: Confirmo la programación de la publicación
    console.log('**And**: Confirmo la programación de la publicación');
    await editorPage.confirmSchedulePost(config.scenarioFolderE2);

    // **Then**: Debería recibir un mensaje de error por fecha/hora inválida
    console.log('**Then**: Debería recibir un mensaje de error por fecha/hora inválida');
    await editorPage.publishInvalidScheduledPost(data.post_content_pe2.date, data.post_content_pe2.time, config.scenarioFolderE2);

    await browser.close();
})();