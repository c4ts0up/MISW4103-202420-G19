const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
const PostPage = require('../pages/postPage');
const MemberPage = require('../pages/memberPage');
const SettingsPage = require('../pages/settingsPage');
const LanguageSettingsPage = require('../pages/languageSettingsPage');
const { takeScreenshot } = require('../utils/screenshotUtils');

// Publish Post
Given('I am correctly authenticated with {kraken-string} and {kraken-string} on {string}', async function (username, password, scenario) {
    const loginPage = new LoginPage(this.driver);
    await loginPage.login(username, password);
    await takeScreenshot(this.driver, '01_authenticated', scenario);
});

Given('I am creating a new post on {string}', async function (scenario) {
    await this.driver.url(`http://localhost:2368/ghost/#/editor/post`);
    await takeScreenshot(this.driver, '02_new_post_page', scenario);
});

Given('I fill the title with {kraken-string} and the content with {kraken-string} on {string}', async function (title, content, scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.fillPostTitleAndContent(title, content);
    await takeScreenshot(this.driver, '03_fill_post_content', scenario);
});

When('I want to schedule the post on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.clickPublishButton();
    await takeScreenshot(this.driver, '04_select_schedule_option', scenario);
});

When('I select the option to schedule for later on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.clickButtonToSchedule();
    await takeScreenshot(this.driver, '05_begin_schedule_post', scenario);
});

When('I enter {kraken-string} and {kraken-string} as publication date on {string}', async function (postDate, postTime, scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.fillPublicationDate(postDate, postTime);
    await takeScreenshot(this.driver, '06_fill_schedule_date', scenario);
});

When('I press the button to finish configurating the post on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.buttonFinishConfiguringPost();
});

When('I press the button to schedule the post on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.publishPost();
    await takeScreenshot(this.driver, '07_schedule_post', scenario);
});

Then('The post is correctly scheduled on {string}', async function (scenario) {
    await this.driver.url('http://localhost:2368/ghost/#/posts?type=scheduled');
    await takeScreenshot(this.driver, '08_post_scheduled', scenario);
});

Then('I should get a message error for invalid date on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.checkValidationError();
    await takeScreenshot(this.driver, '08_error_message_post_not_scheduled', scenario);
});

// Create member
Given('I go to the members page on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.driver.url('http://localhost:2368/ghost/#/members');
    await takeScreenshot(this.driver, '02_members_page', scenario);
});

When('I want to add a new member on {string}', async function (scenario) {
    await this.driver.url('http://localhost:2368/ghost/#/members/new');
    await takeScreenshot(this.driver, '03_new_member', scenario);
});

When('I fill in the member name with {kraken-string} and email with {kraken-string} on {string}', async function (memberName, memberEmail, scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.fillMemberDetails(memberName, memberEmail);
    await takeScreenshot(this.driver, '04_fill_member_info', scenario);
});

When('I press the save button to create the new member on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.saveMember();
    await takeScreenshot(this.driver, '05_save_member', scenario);
});

Then('I should not see a red border indicating a validation error on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    const hasError = await memberPage.checkValidationError();
    if (hasError) {
        console.log('El borde rojo sigue presente, hay un error de validación.');
        await takeScreenshot(this.driver, '06_validation_error', scenario);
    } else {
        console.log('El borde rojo no está presente cuando debería indicar un error');
        await takeScreenshot(this.driver, '06_no_validation_error', scenario);
    }
});

Then('The member is successfully created and listed in members page on {string}', async function (scenario) {
    await this.driver.url('http://localhost:2368/ghost/#/members');
    await takeScreenshot(this.driver, '06_member_created', scenario);
});

// Change language
Given('I navigate to the settings page on {string}', async function (scenario) {
    const settingsPage = new SettingsPage(this.driver);
    await settingsPage.navigateToSettings();
    await takeScreenshot(this.driver, '02_settings_page', scenario);
});

Given('I navigate to the language settings page on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.driver.url('http://localhost:2368/ghost/#/settings/publication-language');
    await takeScreenshot(this.driver, '03_language_settings_page', scenario);
    
});

When('I click the Edit button for language settings on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.clickEditButton();
    await takeScreenshot(this.driver, '04_edit_language', scenario);
});

When('I change the site language to {kraken-string} on {string}', async function (language, scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.changeLanguage(language);
    await takeScreenshot(this.driver, '05_change_language', scenario);
});

Then('The language is updated successfully on {string}', async function (scenario) {
    await this.driver.url('http://localhost:2368/ghost/#/settings/publication-language');
    await takeScreenshot(this.driver, '06_language_updated', scenario);
});

Then('The update should fail due to invalid language on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.failSaveLanguage();
    await takeScreenshot(this.driver, '06_fail_update_language', scenario);
});
