class SettingsPage {
    constructor(driver) {
        this.driver = driver;
        this.settingsUlr = 'http://localhost:2368/ghost/#/settings/';
    }

    async navigateToSettings() {
        await this.driver.url(this.settingsUlr);
    }
}

module.exports = SettingsPage;
