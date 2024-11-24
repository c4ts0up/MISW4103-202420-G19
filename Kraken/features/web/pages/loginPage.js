const config = require('../utils/config.js');
class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.emailField = 'input[name="identification"]';
        this.passwordField = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
        this.baseUrl = config.baseUrl;
    }

    async login(username, password) {
        const loginUrl = `${this.baseUrl}/ghost/#/signin`;
        await this.driver.url(loginUrl);
        let emailField = await this.driver.$(this.emailField);
        await emailField.setValue(username);
        let passwordField = await this.driver.$(this.passwordField);
        await passwordField.setValue(password);
        let loginButton = await this.driver.$(this.loginButton);
        await loginButton.click();
    }
}

module.exports = LoginPage;