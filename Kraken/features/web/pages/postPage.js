class PostPage {
    constructor(driver) {
        this.driver = driver;

        this.titleField = 'textarea[placeholder="Post Title"]';
        this.contentField = '.koenig-editor__editor[data-placeholder="Begin writing your post..."]';
        this.publishButton = 'div.gh-publishmenu .gh-btn.gh-btn-editor.gh-publishmenu-trigger';
        this.scheduleButton = 'div.gh-publishmenu-radio-label=Schedule it for later';
        this.dateField = 'div.gh-date-time-picker-date input[placeholder="YYYY-MM-DD"]';
        this.timeField = 'div.gh-date-time-picker-time input[type="text"]';
        this.finalPublishButton = 'button.gh-btn.gh-btn-black.gh-publishmenu-button span';
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
}

module.exports = PostPage;
