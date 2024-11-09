const playwright = require('playwright');
const LoginPage = require('../pages/loginPage');
const EditorPage = require('../pages/editorPage');
const ScheduledPage = require('../pages/scheduledPage');
const data = require('../utils/data');
const config = require('../utils/config');

(async () => {

  //------------------------------------------------------------------------------------------
  //                   E1: Programar una publicación con fecha valida
  //------------------------------------------------------------------------------------------

  // Lanzar el navegador y crear contexto
  const browser = await playwright.chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const editorPage = new EditorPage(page);
  const scheduledPage = new ScheduledPage(page);

  // Login
  console.log('Login');
  await loginPage.navigate(config.baseUrl);
  await loginPage.login(data.login.username, data.login.password, config.scenarioFolderE1);

  // **Given**: Estoy creando una nueva publicación
  console.log('**Given**: Estoy creando una nueva publicación');
  await page.goto(config.editorUrl);
  //**And**: Lleno el titulo y cuerpo de la publicación
  console.log('**And**: Lleno el titulo y cuerpo de la publicación');
  await editorPage.createPost(data.post_content_pe1.title, data.post_content_pe1.content, config.scenarioFolderE1);

  // **When**: Quiero programar la publicación
  console.log('**When**: Quiero programar la publicación');
  await editorPage.beginSchedulePost(config.scenarioFolderE1);
  // **And**: Ingreso una fecha valida de publicación
  console.log('**And**: Ingreso una fecha valida de publicación');
  await editorPage.fillScheduleData(data.post_content_pe1.date, data.post_content_pe1.time, config.scenarioFolderE1);
  // **And**: Confirmo la programación de la publicación
  console.log('**And**: Confirmo la programación de la publicación');
  await editorPage.confirmSchedulePost(config.scenarioFolderE1);

  // **Then**: La publicación debe programarse correctamente
  console.log('**Then**: La publicación debe programarse correctamente');
  await editorPage.publishScheduledPost(config.scenarioFolderE1);
  // **And**: Debe aparecer la publicación en la lista de publicaciones programadas
  console.log('**And**: Debe aparecer la publicación en la lista de publicaciones programadas');
  await scheduledPage.reviewScheduledPosts(config.scheduledUrl, config.scenarioFolderE1);

  await browser.close();
})();