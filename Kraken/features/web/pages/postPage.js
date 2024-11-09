class PostPage {
    constructor(driver) {
        this.driver = driver;

        // Elementos de la página
        this.titleField = 'textarea[placeholder="Post title"]';
        this.contentField = '.koenig-react-editor .koenig-lexical';
        this.publishButton = 'button.gh-btn.gh-btn-editor.gh-publish-trigger';
        this.clockButton = 'div[data-test-setting="publish-at"] button.gh-publish-setting-title';
        this.scheduleButton = 'div.gh-radio:has(div[data-test-radio="schedule"]) label';
        this.dateField = 'input[data-test-date-time-picker-date-input]';
        this.timeField = 'input[data-test-date-time-picker-time-input]';
        this.continueButton = 'button[data-test-button="continue"]';
        this.finalPublishButton = '.gh-publish-cta .gh-btn-pulse';
        this.errorMessage = '.gh-alert-content';
    }

    async fillPostTitleAndContent(title, content) {
        const titleInput = await this.driver.$(this.titleField);
        await titleInput.setValue(title);

        const contentInput = await this.driver.$(this.contentField);
        await contentInput.click();
        await this.driver.keys(content);
    }

    async clickPublishButton() {
        const publishButton = await this.driver.$(this.publishButton);
        await publishButton.click();
    }

    async clickButtonToSchedule() {
        const clockButton = await this.driver.$(this.clockButton);
        await clockButton.click();
        const scheduleButton = await this.driver.$(this.scheduleButton);
        await scheduleButton.click();
    }

    async fillPublicationDate(postDate, postTime) {
        const dateField = await this.driver.$(this.dateField);
        await dateField.setValue(postDate);

        const timeField = await this.driver.$(this.timeField);
        await timeField.setValue(postTime);
    }

    async buttonFinishConfiguringPost() {
        const continueButton = await this.driver.$(this.continueButton);
        await continueButton.click();
    }

    async publishPost() {
        const publishButton = await this.driver.$(this.finalPublishButton);
        await publishButton.click({ force: true });
    }

    async checkValidationError() {
        try {
            const error = await this.driver.$(this.errorMessage);
            console.log('Error message found, post not scheduled');
            return await error.getText();
        } catch (error) {
            console.log('No error message found, post scheduled incorrectly');
        }
    }
}

module.exports = PostPage;
