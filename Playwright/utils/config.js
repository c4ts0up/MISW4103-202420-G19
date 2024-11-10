// utils/config.js
const fs = require(`fs`);

const ip = `localhost`;
const port = `3001`;
const baseUrl =  `http://${ip}:${port}/ghost`;
const screenshotFolder = `./screenshots`;

const config = {
  ip,
  port,
  baseUrl,
  editorUrl: `${baseUrl}/#/editor/post`,
  scheduledUrl: `${baseUrl}/#/posts?type=scheduled`,
  newMemberUrl : `${baseUrl}/#/members/new`,
  membersPageUrl : `${baseUrl}/#/members`,
  settingsUrl: `${baseUrl}/#/settings`,
  languageSettingsUrl: `${baseUrl}/#/settings/publication-language`,

  // capturas de pantalla por cada escenario
  screenshotFolder,
  scenarioFolderE1: `${screenshotFolder}/E1`,
  scenarioFolderE2: `${screenshotFolder}/E2`,
  scenarioFolderE3: `${screenshotFolder}/E3`,
  scenarioFolderE4: `${screenshotFolder}/E4`,
  scenarioFolderE5: `${screenshotFolder}/E5`,
  scenarioFolderE6: `${screenshotFolder}/E6`,
};

// Crear carpetas si no existen
if (!fs.existsSync(config.screenshotFolder)) fs.mkdirSync(config.screenshotFolder);
if (!fs.existsSync(config.scenarioFolderE1)) fs.mkdirSync(config.scenarioFolderE1);
if (!fs.existsSync(config.scenarioFolderE2)) fs.mkdirSync(config.scenarioFolderE2);
if (!fs.existsSync(config.scenarioFolderE3)) fs.mkdirSync(config.scenarioFolderE3);
if (!fs.existsSync(config.scenarioFolderE4)) fs.mkdirSync(config.scenarioFolderE4);
if (!fs.existsSync(config.scenarioFolderE5)) fs.mkdirSync(config.scenarioFolderE5);
if (!fs.existsSync(config.scenarioFolderE6)) fs.mkdirSync(config.scenarioFolderE6);

module.exports = config;
