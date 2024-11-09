const playwright = require('playwright');
const LoginPage = require('../pages/loginPage');
const MembersPage = require('../pages/membersPage');
const data = require('../utils/data');
const config = require('../utils/config');

(async () => {

    //------------------------------------------------------------------------------------------
    //                   E4: Crear un nuevo miembro con un correo invalido
    //------------------------------------------------------------------------------------------

    // Lanzar el navegador y crear contexto
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // Inicializar las páginas
    const loginPage = new LoginPage(page);
    const membersPage = new MembersPage(page);

    // Login
    console.log('Login');
    await loginPage.navigate(config.baseUrl);
    await loginPage.login(data.login.username, data.login.password, config.scenarioFolderE4);

    // **Given**: Estoy en la página de creación de miembros
    console.log('**Given**: Estoy en la página de creación de miembros');
    await membersPage.navigate(config.membersPageUrl);
    await membersPage.screenshotMembersList(config.scenarioFolderE4);

    // **When**: Creo un nuevo miembro con datos válidos
    console.log('**When**: Creo un nuevo miembro con datos válidos');
    await membersPage.navigate(config.newMemberUrl);
    // **And**: Agrego la información del miembro con un correo invalido
    await membersPage.createMember(data.member_content_pe4.name, data.member_content_pe4.email_invalid, config.scenarioFolderE4);
    // **And**: Intento guardar la información del miembro con un correo invalido
    console.log('**And**: Intento guardar la información del miembro con un correo invalido');
    await membersPage.saveMember(config.scenarioFolderE4);
    // **And**: Corrijo la información del miembro con un correo valido
    console.log('**And**: Corrijo la información del miembro con un correo valido');
    await membersPage.retryCreateMember(data.member_content_pe4.name, data.member_content_pe4.email_valid, config.scenarioFolderE4);
    // **And**: Guardo la información del miembro
    console.log('**And**: Guardo la información del miembro');
    await membersPage.retrySaveMember(config.scenarioFolderE4);

    // **Then**: El borde rojo del campo de correo debe desaparecer
    console.log('**Then**: El borde rojo del campo de correo debe desaparecer');
    await membersPage.verifyEmailFieldBorder(config.scenarioFolderE4);
    // **And**: El nuevo miembro debe aparecer en la lista de miembros
    console.log('**And**: El nuevo miembro debe aparecer en la lista de miembros');
    await membersPage.navigate(config.membersPageUrl);
    await membersPage.retryVerifyMemberCreated(config.scenarioFolderE4);

    // Cerrar el navegador
    await browser.close();
})();
