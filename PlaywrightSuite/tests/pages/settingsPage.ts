import {BasePage} from "./basePage";
import {Page} from "playwright";
import logger from "../utils/logger";
import {expect} from "@playwright/test";

export enum SubSettingsSelectors {
    LANGUAGE = 'language',
    TIMEZONE = 'timezone'
}

const SettingsOptions = {
    language: {
        resource: 'publication-language',
        testId: "publication-language",
        editButton: 'div[data-testid="publication-language"] button:has-text("Edit")',
        saveButton: 'button.bg-green',
        initialText: 'div[data-testid="publication-language"] input'
    },

    timezone: {
        resource: 'timezone',
        testId: "timezone",
        editButton: 'div[data-testid="timezone"] button:has-text("Edit")',
        saveButton: 'button.bg-green',
        initialText: 'div[data-testid="timezone-select"] > :nth-child(1)'
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

    async changeTimezone(timezone: string) {
        logger.info(`Changing timezone to timezone = ${timezone}`);
        await this.page
            .getByTestId('timezone-select')
            .click();

        await this.page.keyboard.type(timezone);
        await this.page.keyboard.press('Enter');
    }

    async confirmSettingUpdate(subSetting: SubSettingsSelectors) {
        logger.info(`Confirming ${subSetting} update`);

        const button = {
            [SubSettingsSelectors.LANGUAGE]: SettingsOptions.language.saveButton,
            [SubSettingsSelectors.TIMEZONE]: SettingsOptions.timezone.saveButton,
        }[subSetting];

        await this.page.click(button);
    }

    async getInitialTextLocator(subSetting: SubSettingsSelectors) {
        logger.info(`Getting inital text from ${subSetting}`);

        const intialTextLocator = {
            [SubSettingsSelectors.LANGUAGE]: SettingsOptions.language.initialText,
            [SubSettingsSelectors.TIMEZONE]: SettingsOptions.timezone.initialText,
        }[subSetting]

        await this.page.waitForLoadState('domcontentloaded');

        return this.page.locator(intialTextLocator);
    }

    async cantConfirmSetting(subSetting: SubSettingsSelectors) {
        logger.info(`Validating that ${subSetting} update is impossible`);

        const button = {
            [SubSettingsSelectors.LANGUAGE]: SettingsOptions.language.saveButton,
            [SubSettingsSelectors.TIMEZONE]: SettingsOptions.timezone.saveButton,
        }[subSetting];

        await expect(this.page.locator(button)).toHaveCount(0);
    }

    async changeLanguage(language: string) {
        logger.info(`Changing language to language = ${language}`);
        const languageField = await this.page.$(this.languageInput);
        await languageField!.click();
        await languageField!.press('Control+A');
        await languageField!.press('Backspace');
        await this.page.fill(this.languageInput, language);
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