// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[name="identification"]';
    this.passwordInput = 'input[name="password"]';
    this.submitButton = 'button[type="submit"]';
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async login(email, password, screenshotPath) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.screenshot({ path: `${screenshotPath}/01_login-filled.png` });
    await this.page.click(this.submitButton);
    await this.page.waitForNavigation();
    await this.page.screenshot({ path: `${screenshotPath}/02_login-success.png` });
  }
}

module.exports = LoginPage;
