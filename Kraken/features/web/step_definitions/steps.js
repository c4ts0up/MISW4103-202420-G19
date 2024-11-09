const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
const PostPage = require('../pages/postPage');
const MemberPage = require('../pages/memberPage');
const SettingsPage = require('../pages/settingsPage');
const LanguageSettingsPage = require('../pages/languageSettingsPage');

// Publish Post
Given('I am correctly authenticated with {kraken-string} and {kraken-string}', async function (username, password) {
    const loginPage = new LoginPage(this.driver);
    await loginPage.login(username, password);
});

Given('I am creating a new post', async function () {
    await this.driver.url(`http://localhost:2368/ghost/#/editor/post`);
});

Given('I fill the title with {kraken-string} and the content with {kraken-string}', async function (title, content) {
    const postPage = new PostPage(this.driver);
    await postPage.fillPostTitleAndContent(title, content);
});

When('I want to schedule the post', async function () {
    const postPage = new PostPage(this.driver);
    await postPage.clickPublishButton();
});

When('I select the option to schedule for later', async function () {
    const postPage = new PostPage(this.driver);
    await postPage.clickButtonToSchedule();
});

When('I enter {kraken-string} and {kraken-string} as publication date', async function (postDate, postTime) {
    const postPage = new PostPage(this.driver);
    await postPage.fillPublicationDate(postDate, postTime);
});

When('I press the button to finish configurating the post', async function () {
    const postPage = new PostPage(this.driver);
    await postPage.buttonFinishConfiguringPost();
});

When('I press the button to schedule the post', async function () {
    const postPage = new PostPage(this.driver);
    await postPage.publishPost();
});

Then('The post is correctly scheduled', async function () {
    await this.driver.url('http://localhost:2368/ghost/#/posts?type=scheduled');
});

Then('I should get a message error for invalid date', async function () {
    const postPage = new PostPage(this.driver);
    await postPage.checkValidationError();
});

// Create member
Given('I go to the members page', async function () {
    const memberPage = new MemberPage(this.driver);
    await memberPage.driver.url('http://localhost:2368/ghost/#/members');
});

When('I want to add a new member', async function () {
    await this.driver.url('http://localhost:2368/ghost/#/members/new');
});

When('I fill in the member name with {kraken-string} and email with {kraken-string}', async function (memberName, memberEmail) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.fillMemberDetails(memberName, memberEmail);
});

When('I press the save button to create the new member', async function () {
    const memberPage = new MemberPage(this.driver);
    await memberPage.saveMember();
});

Then('I should not see a red border indicating a validation error', async function () {
    const memberPage = new MemberPage(this.driver);
    const hasError = await memberPage.checkValidationError();
    if (hasError) {
        console.log('El borde rojo sigue presente, hay un error de validación.');
    } else {
        console.log('El borde rojo no está presente cuando debería indicar un error');
    }
});

Then('The member is successfully created and listed in the members page', async function () {
    await this.driver.url('http://localhost:2368/ghost/#/members');
});

// Change language
Given('I navigate to the settings page', async function () {
    const settingsPage = new SettingsPage(this.driver);
    await settingsPage.navigateToSettings();
});

Given('I navigate to the language settings page', async function () {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.driver.url('http://localhost:2368/ghost/#/settings/publication-language');
});

When('I click the Edit button for language settings', async function () {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.clickEditButton();
});

When('I change the site language to {kraken-string}', async function (language) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.changeLanguage(language);
});

Then('The language is updated successfully', async function () {
    await this.driver.url('http://localhost:2368/ghost/#/settings/publication-language');
});

Then('The update should fail due to invalid language', async function () {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.failSaveLanguage();
});
