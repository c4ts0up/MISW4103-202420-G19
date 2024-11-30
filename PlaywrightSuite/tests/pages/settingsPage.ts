import {BasePage} from "./basePage";
import {Page} from "playwright";
import logger from "../utils/logger";

export enum SubSettingsSelectors {
    LANGUAGE,
    TIMEZONE
}

const SettingsOptions = {
    language: {
        resource: 'publication-language',
        editButton: 'div[data-testid="publication-language"] button:has-text("Edit")',
        saveButton: 'button.bg-green'
    },

    timezone: {
        resource: 'timezone',
        editButton: 'div[data-testid="timezone"] button:has-text("Edit")',
        saveButton: 'button.bg-green'
    }
}


/**
 * Representa las configuraciones del administrador
 */
class SettingsPage extends BasePage {
    // fields
    private readonly languageInput = 'input[placeholder="Site language"]';


    constructor(page: Page, resource: string) {
        super(page, resource)
    }

    async navigateToSubSetting(subSetting: SubSettingsSelectors) {
        logger.info(`Navigating to sub-setting = ${subSetting}`);

        const resource = {
            [SubSettingsSelectors.LANGUAGE]: SettingsOptions.language.resource,
            [SubSettingsSelectors.TIMEZONE]: SettingsOptions.timezone.resource,
        }[subSetting]

        await this.page.goto(`${this.resource}/${resource}`, { waitUntil: 'domcontentloaded' });
    }

    async clickEditButton(subSetting: SubSettingsSelectors) {
        logger.info(`Clicking on ${subSetting} edit button`);

        const button = {
            [SubSettingsSelectors.LANGUAGE]: SettingsOptions.language.editButton,
            [SubSettingsSelectors.TIMEZONE]: SettingsOptions.timezone.editButton,
        }[subSetting];

        await this.page.click(button);
    }

    async changeLanguage(language: string) {
        logger.info(`Changing language to language = ${language}`);
        const languageField = await this.page.$(this.languageInput);
        await languageField!.click();
        await languageField!.press('Control+A');
        await languageField!.press('Backspace');
        await this.page.fill(this.languageInput, language);
    }

    async confirmLanguageUpdate(subSetting: SubSettingsSelectors) {
        logger.info(`Confirming language update`);

        const button = {
            [SubSettingsSelectors.LANGUAGE]: SettingsOptions.language.saveButton,
            [SubSettingsSelectors.TIMEZONE]: SettingsOptions.timezone.saveButton,
        }[subSetting];

        await this.page.click(button);
    }

    // FIXME: usar expect-based
    async failUpdateLanguage() {
        logger.info(`Confirming failed language update`);
        try {
            await this.page.waitForSelector(SettingsOptions.language.saveButton, { state: 'detached' });
        } catch (error) {
            logger.error("Failure confirming failed language update");
        }
    }
}

export default SettingsPage;