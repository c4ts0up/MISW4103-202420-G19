const { Given, When, Then } = require('@cucumber/cucumber');
const LoginPage = require('../pages/loginPage');
const PostPage = require('../pages/postPage');
const MemberPage = require('../pages/memberPage');
const SettingsPage = require('../pages/settingsPage');
const LanguageSettingsPage = require('../pages/languageSettingsPage');
const { takeScreenshot } = require('../utils/screenshotUtils');
const { faker } = require('@faker-js/faker');
const config = require('../utils/config.js');

// Publish Post
Given('I am correctly authenticated with {kraken-string} and {kraken-string} on {string}', async function (username, password, scenario) {
    const loginPage = new LoginPage(this.driver);
    await loginPage.login(username, password);
    await takeScreenshot(this.driver, '01_authenticated', scenario);
});

Given('I am creating a new post on {string}', async function (scenario) {
    await this.driver.url(`${config.baseUrl}/ghost/#/editor/post`);
    await takeScreenshot(this.driver, '02_new_post_page', scenario);
});

Given('I fill the title with {kraken-string} and the content with {kraken-string} on {string}', async function (title, content, scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.fillPostTitleAndContent(title, content);
    await takeScreenshot(this.driver, '03_fill_post_content', scenario);
});

Given('I fill the title and the content with pseudo-aleatory data on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    const title = faker.lorem.sentence(10);
    const content = faker.lorem.paragraphs(2);
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

When('I enter a publication date with pseudo-aleatory data on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    const futureDate = faker.date.future(1);
    const postDate = futureDate.toISOString().split('T')[0];
    const hours = String(futureDate.getHours()).padStart(2, '0');
    const minutes = String(futureDate.getMinutes()).padStart(2, '0');
    const postTime = `${hours}:${minutes}`;
    await postPage.fillPublicationDate(postDate, postTime);
    await takeScreenshot(this.driver, '06_fill_schedule_date', scenario);
});

When('I enter an invalid publication date with pseudo-aleatory data on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);

    const invalidMonth = faker.datatype.number({ min: 1, max: 12 });
    const invalidDay = faker.datatype.number({ min: 29, max: 31 });
    const invalidYear = new Date().getFullYear();
    const postDate = `${invalidYear}-${String(invalidMonth).padStart(2, '0')}-${String(invalidDay).padStart(2, '0')}`;

    const invalidHours = faker.datatype.number({ min: 24, max: 99 });
    const invalidMinutes = faker.datatype.number({ min: 60, max: 99 });
    const postTime = `${String(invalidHours).padStart(2, '0')}:${String(invalidMinutes).padStart(2, '0')}`;

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
    await this.driver.url(`${config.baseUrl}/ghost/#/posts?type=scheduled`);
    await takeScreenshot(this.driver, '08_post_scheduled', scenario);
});

Then('I should get a message error for invalid date on {string}', async function (scenario) {
    const postPage = new PostPage(this.driver);
    await postPage.checkValidationError();
    await takeScreenshot(this.driver, '07_error_message_post_not_scheduled', scenario);
});

// Create member
Given('I go to the members page on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.driver.url(`${config.baseUrl}/ghost/#/members`);
    await takeScreenshot(this.driver, '02_members_page', scenario);
});

When('I want to add a new member on {string}', async function (scenario) {
    await this.driver.url(`${config.baseUrl}/ghost/#/members/new`);
    await takeScreenshot(this.driver, '03_new_member', scenario);
});

When('I fill in the member name with {kraken-string} and email with {kraken-string} on {string}', async function (memberName, memberEmail, scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.fillMemberDetails(memberName, memberEmail);
    await takeScreenshot(this.driver, '04_fill_member_info', scenario);
});

When('I fill in the member name and email with pseudo-aleatory data on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    
    const memberFirstName = faker.name.firstName();
    const memberLastName = faker.name.lastName();
    const memberName = `${memberFirstName} ${memberLastName}`;

    const memberEmail = faker.internet.email(memberFirstName, memberLastName).toLowerCase();

    await memberPage.fillMemberDetails(memberName, memberEmail);
    await takeScreenshot(this.driver, '04_fill_member_info', scenario);
});

When('I fill in the member name and email with pseudo-aleatory with invalid data on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    
    const memberFirstName = faker.name.firstName();
    const memberLastName = faker.name.lastName();
    const memberName = `${memberFirstName} ${memberLastName}`;

    const invalidEmails = [
        `${memberFirstName}${memberLastName}`,
        `${memberFirstName}@${memberLastName}`,
        `${memberFirstName}${memberLastName}@.com`,
        `${memberFirstName}${memberLastName}@com`,
        `${memberFirstName}${memberLastName}@example,com`,
    ];
    const memberEmail = invalidEmails[Math.floor(Math.random() * invalidEmails.length)];

    await memberPage.fillMemberDetails(memberName, memberEmail);
    await takeScreenshot(this.driver, '04_fill_member_info', scenario);
});

When('I fill in again the member name and email with pseudo-aleatory data on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    
    const memberFirstName = faker.name.firstName();
    const memberLastName = faker.name.lastName();
    const memberName = `${memberFirstName} ${memberLastName}`;

    const memberEmail = faker.internet.email(memberFirstName, memberLastName).toLowerCase();

    await memberPage.fillMemberDetails(memberName, memberEmail);
    await takeScreenshot(this.driver, '06_fill_member_info_again', scenario);
});

When('I fill in again the member name with {kraken-string} and email with {kraken-string} on {string}', async function (memberName, memberEmail, scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.fillMemberDetails(memberName, memberEmail);
    await takeScreenshot(this.driver, '06_fill_member_info_again', scenario);
});

When('I press the save button to create the new member on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.saveMember();
    await takeScreenshot(this.driver, '05_save_member', scenario);
});

When('I press the save button again to create the new member on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    await memberPage.saveMember();
    await takeScreenshot(this.driver, '07_save_member_again', scenario);
});

Then('I should not see a red border indicating a validation error on {string}', async function (scenario) {
    const memberPage = new MemberPage(this.driver);
    const hasError = await memberPage.checkValidationError();
    if (hasError) {
        console.log('El borde rojo sigue presente, hay un error de validación.');
        await takeScreenshot(this.driver, '08_validation_error', scenario);
    } else {
        console.log('El borde rojo no está presente cuando debería indicar un error');
        await takeScreenshot(this.driver, '08_no_validation_error', scenario);
    }
});

Then('The member is successfully created and listed in members page on {string}', async function (scenario) {
    await this.driver.url(`${config.baseUrl}/ghost/#/members`);
    await takeScreenshot(this.driver, '06_member_created', scenario);
});

Then('The member is still successfully created and listed in members page on {string}', async function (scenario) {
    await this.driver.url(`${config.baseUrl}/ghost/#/members`);
    await takeScreenshot(this.driver, '09_member_created', scenario);
});

// Change language
Given('I navigate to the settings page on {string}', async function (scenario) {
    const settingsPage = new SettingsPage(this.driver);
    await settingsPage.navigateToSettings();
    await takeScreenshot(this.driver, '02_settings_page', scenario);
});

Given('I navigate to the language settings page on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.driver.url(`${config.baseUrl}/ghost/#/settings/publication-language`);
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

When('I change the site language with pseudo-aleatory data on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    const languageCodes = ['de', 'es', 'fr', 'it', 'ja', 'nl', 'pl', 'pt', 'ru', 'tr', 'zh', 'ar', 'hi', 'ko'];
    const language = languageCodes[Math.floor(Math.random() * languageCodes.length)];
    await languageSettingsPage.changeLanguage(language);
    await takeScreenshot(this.driver, '05_change_language', scenario);
});

When('I change the site language with pseudo-aleatory invalid data on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    
    const generateInvalidLanguageCode = () => {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        let invalidCode;
        do {
            invalidCode = Array(2)
                .fill()
                .map(() => letters[Math.floor(Math.random() * letters.length)])
                .join('');
        } while (['en', 'de', 'es', 'fr', 'it', 'ja', 'nl', 'pl', 'pt', 'ru', 'tr', 'zh', 'ar', 'hi', 'ko'].includes(invalidCode));
        return invalidCode;
    };

    const language = generateInvalidLanguageCode();
    await languageSettingsPage.changeLanguage(language);
    await takeScreenshot(this.driver, '05_change_language', scenario);
});

When('I save the configuration with the new language on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    languageSettingsPage.saveLanguage();
    await takeScreenshot(this.driver, '06_save_language', scenario);
});

Then('The language is updated successfully on {string}', async function (scenario) {
    await this.driver.url(`${config.baseUrl}/ghost/#/settings/publication-language`);
    await takeScreenshot(this.driver, '07_language_updated', scenario);
});

Then('The update should fail due to invalid language on {string}', async function (scenario) {
    const languageSettingsPage = new LanguageSettingsPage(this.driver);
    await languageSettingsPage.failSaveLanguage();
    await takeScreenshot(this.driver, '07_fail_update_language', scenario);
});
