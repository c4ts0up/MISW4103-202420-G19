const config = require('../utils/config.js');
class SettingsPage {
    constructor(driver) {
        this.driver = driver;
        this.settingsUrl = `${config.baseUrl}/ghost/#/settings/`
    }

    async navigateToSettings() {
        await this.driver.url(this.settingsUlr);
    }
}

module.exports = SettingsPage;
