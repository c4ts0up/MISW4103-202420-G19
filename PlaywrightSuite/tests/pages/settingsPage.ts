import {BasePage} from "./basePage";
import {Page} from "playwright";
import logger from "../utils/logger";

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
        logger.info(`Navigating to sub-setting = ${subSetting}`);
        await this.page.goto(`${this.resource}/${subSetting}`, { waitUntil: 'domcontentloaded' });
    }

    async clickEditButton() {
        logger.info(`Clicking on edit button`);
        await this.page.click(this.editButton);
    }

    async changeLanguage(language: string) {
        logger.info(`Changing language to language = ${language}`);
        await this.page.fill(this.languageInput, language);
    }

    async confirmLanguageUpdate() {
        logger.info(`Confirming language update`);
        await this.page.click(this.saveButton);
    }

    // FIXME: usar expect-based
    async failUpdateLanguage() {
        logger.info(`Confirming failed language update`);
        try {
            await this.page.waitForSelector(this.saveButton, { state: 'detached' });
        } catch (error) {
            logger.error("Failure confirming failed language update");
        }
    }
}

export default SettingsPage;