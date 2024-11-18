class SettingsPage {
    constructor(driver) {
        this.driver = driver;
        this.settingsUlr = 'http://localhost:2368/ghost/#/settings/';
        this.generalSettingUrl = 'http://localhost:2368/ghost/#/settings/general';
    }

    async navigateToSettings() {
        await this.driver.url(this.settingsUlr);
    }

    async navigateToGeneralSettings() {
        await this.driver.url(this.generalSettingUrl);
    }
}

module.exports = SettingsPage;
