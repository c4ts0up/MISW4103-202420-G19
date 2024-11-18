class LanguageSettingsPage {
    constructor(driver) {
        this.driver = driver;
        this.languageInput = 'input.ember-text-field.gh-input.ember-view';
        this.editButton = 'button.gh-btn[data-ember-action-90="90"]';
        this.saveButton = 'button.gh-btn.gh-btn-primary.gh-btn-icon.ember-view';
    }

    async clickEditButton() {
        const editButton = await this.driver.$(this.editButton);
        await editButton.click();
    }

    async changeLanguage(language) {
        const languageField = await this.driver.$(this.languageInput);
        await languageField.click();
        await languageField.keys(['Control', 'a']);
        await languageField.keys('Backspace');
        await languageField.setValue(language);
    }

    async saveLanguage() {
        const saveButton = await this.driver.$(this.saveButton);
        await saveButton.click();
        console.log('Language settings saved');
    }
}

module.exports = LanguageSettingsPage;