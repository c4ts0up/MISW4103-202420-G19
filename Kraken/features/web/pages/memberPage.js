class MemberPage {
    constructor(driver) {
        this.driver = driver;
        this.nameField = 'input#member-name';
        this.emailField = 'input#member-email';
        this.saveButton = 'button[data-test-button="save"]';
        this.validationError = 'input#member-email.error';
    }

    async fillMemberDetails(name, email) {
        const nameInput = await this.driver.$(this.nameField);
        const emailInput = await this.driver.$(this.emailField);

        await nameInput.setValue(name);
        await emailInput.setValue(email);
    }

    async saveMember() {
        const saveButton = await this.driver.$(this.saveButton);
        await saveButton.click();
    }

    async checkValidationError() {
        const errorElement = await this.driver.$(this.validationError);
        return await errorElement.isDisplayed();
    }
}

module.exports = MemberPage;