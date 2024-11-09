const playwright = require('playwright');
const LoginPage = require('../pages/loginPage');
const MembersPage = require('../pages/membersPage');
const data = require('../utils/data');
const config = require('../utils/config');

(async () => {

  //------------------------------------------------------------------------------------------
  //                   E3: Crear un nuevo miembro con un correo valido
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
  await loginPage.login(data.login.username, data.login.password, config.scenarioFolderE3);

  // **Given**: Estoy en la página de creación de miembros
  console.log('**Given**: Estoy en la página de creación de miembros');
  await membersPage.navigate(config.membersPageUrl);
  await membersPage.screenshotMembersList(config.scenarioFolderE3);

  // **When**: Creo un nuevo miembro con datos válidos
  console.log('**When**: Creo un nuevo miembro con datos válidos');
  await membersPage.navigate(config.newMemberUrl);
  // **And**: Agrego la información del miembro con un correo valido
  await membersPage.createMember(data.member_content_pe3.name, data.member_content_pe3.email, config.scenarioFolderE3);
  // **And**: Intento guardar la información del miembro
  console.log('**And**: Guardo la información del miembro');
  await membersPage.saveMember(config.scenarioFolderE3);

  // **Then**: El nuevo miembro debe aparecer en la lista de miembros
  console.log('**Then**: El nuevo miembro debe aparecer en la lista de miembros');
  await membersPage.navigate(config.membersPageUrl);
  await membersPage.verifyMemberCreation(config.scenarioFolderE3);

  // Cerrar el navegador
  await browser.close();
})();
