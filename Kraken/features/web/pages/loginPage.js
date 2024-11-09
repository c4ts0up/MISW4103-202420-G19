class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.emailField = 'input[name="identification"]';
        this.passwordField = 'input[name="password"]';
        this.loginButton = 'button[type="submit"]';
    }

    async login(username, password) {
        await this.driver.url('http://localhost:2368/ghost/#/signin');
        let emailField = await this.driver.$(this.emailField);
        await emailField.setValue(username);
        let passwordField = await this.driver.$(this.passwordField);
        await passwordField.setValue(password);
        let loginButton = await this.driver.$(this.loginButton);
        await loginButton.click();
    }
}

module.exports = LoginPage;