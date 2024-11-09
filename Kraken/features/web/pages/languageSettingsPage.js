class LanguageSettingsPage {
    constructor(driver) {
        this.driver = driver;
        this.languageInput = 'input[placeholder="Site language"]';
        this.editButton = 'div[data-testid="publication-language"] button';
        this.saveButton = 'button.bg-green';
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

    async failSaveLanguage() {
        try {
            await this.page.waitForSelector(this.saveButton, { state: 'disabled' });
            console.log('El botón de guardar está deshabilitado, el idioma no es válido');
        } catch (error) {
            let saveButton = await this.driver.$('button.bg-green');
            await saveButton.click();
            console.log('El botón de guardar está habilitado aunque el idioma es valido y se ha guardado');
        }
    }
}

module.exports = LanguageSettingsPage;