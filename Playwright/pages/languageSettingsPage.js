// pages/LanguageSettingsPage.js
class LanguageSettingsPage {
    constructor(page) {
        this.page = page;
        this.identificationInput = 'input[name="identification"]';
        this.passwordInput = 'input[name="password"]';
        this.submitButton = 'button[type="submit"]';
        this.settingsUrl = 'settingsUrl'; // URL de configuración (modifica según tu caso)
        this.languageSettingsUrl = 'languageSettingsUrl'; // URL de configuración de idioma (modifica según tu caso)
        this.editButton = 'div[data-testid="publication-language"] button:has-text("Edit")';
        this.languageInput = 'input[placeholder="Site language"]';
        this.saveButton = 'button.bg-green';
    }

    async navigate(url) {
        await this.page.goto(url);
    }

    async goToSettings(screenshotPath) {
        await this.page.screenshot({ path: `${screenshotPath}/03_settings-page.png` });
        await this.page.waitForTimeout(2000);
    }

    async goToLanguageSettings(screenshotPath) {
        await this.page.screenshot({ path: `${screenshotPath}/04_language-settings-page.png` });
        await this.page.waitForTimeout(2000);
    }

    async clickEditButton(screenshotPath) {
        await this.page.click(this.editButton);
        await this.page.screenshot({ path: `${screenshotPath}/05_edit-button-clicked.png` });
    }

    async changeLanguage(language, screenshotPath) {
        await this.page.fill(this.languageInput, language);
        await this.page.screenshot({ path: `${screenshotPath}/06_language-input-filled.png` });
    }

    async updateLanguage(screenshotPath) {
        await this.page.click(this.saveButton);
        await this.page.waitForTimeout(2000);
        await this.page.screenshot({ path: `${screenshotPath}/07_language_updated.png` });
    }

    async failUpdateLanguage(screenshotPath) {
        try {
            await this.page.waitForSelector(this.saveButton, { state: 'disabled' });
            await this.page.screenshot({ path: `${screenshotPath}/07_update_stopped_invalid_input.png` });
        } catch (error) {
            await this.page.screenshot({ path: `${screenshotPath}/07_language_should_not_be_updated.png` });
        }
    }
}

module.exports = LanguageSettingsPage;
