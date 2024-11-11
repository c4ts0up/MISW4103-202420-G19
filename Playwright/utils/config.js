// utils/config.js
const fs = require('fs');

const config = {
  baseUrl: 'http://localhost:2368/ghost/',
  editorUrl: 'http://localhost:2368/ghost/#/editor/post',
  scheduledUrl: 'http://localhost:2368/ghost/#/posts?type=scheduled',
  newMemberUrl : 'http://localhost:2368/ghost/#/members/new',
  membersPageUrl : 'http://localhost:2368/ghost/#/members',
  settingsUrl: 'http://localhost:2368/ghost/#/settings',
  languageSettingsUrl: 'http://localhost:2368/ghost/#/settings/publication-language',
  screenshotFolder: './screenshots',
  scenarioFolderE1: './screenshots/E1',
  scenarioFolderE2: './screenshots/E2',
  scenarioFolderE3: './screenshots/E3',
  scenarioFolderE4: './screenshots/E4',
  scenarioFolderE5: './screenshots/E5',
  scenarioFolderE6: './screenshots/E6',
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
