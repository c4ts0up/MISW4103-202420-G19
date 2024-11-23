import {BasePage} from "./basePage";
import {Page} from "playwright";

export enum SubSettingsSelectors {
    LANGUAGE = 'publication-language'
}


/**
 * Representa las configuraciones del administrador
 */
class SettingsPage extends BasePage {
    // fields
    private readonly languageInput = 'input[placeholder="Site language"]';

    // buttons
    private readonly editButton = 'div[data-testid="publication-language"] button:has-text("Edit")';
    private readonly saveButton = 'button.bg-green';


    constructor(page: Page, resource: string) {
        super(page, resource)
    }

    async navigateToSubSetting(subSetting: SubSettingsSelectors) {
        await this.page.goto(`${this.resource}/${subSetting}`, { waitUntil: 'domcontentloaded' });
    }

    async clickEditButton() {
        await this.page.click(this.editButton);
    }

    async changeLanguage(language: string) {
        await this.page.fill(this.languageInput, language);
    }

    async confirmLanguageUpdate() {
        await this.page.click(this.saveButton);
    }

    async failUpdateLanguage() {
        try {
            await this.page.waitForSelector(this.saveButton, { state: 'detached' });
        } catch (error) { }
    }
}

export default SettingsPage;