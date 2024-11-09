// pages/MembersPage.js
class MembersPage {
  constructor(page) {
    this.page = page;
    this.memberNameInput = 'input#member-name';
    this.memberEmailInput = 'input#member-email';
    this.saveButton = 'button[data-test-button="save"]';
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async screenshotMembersList(screenshotPath) {
    await this.page.screenshot({ path: `${screenshotPath}/03_members-list.png` });
  }

  async createMember(name, email, screenshotPath) {
    await this.page.fill(this.memberNameInput, name);
    await this.page.fill(this.memberEmailInput, email);
    await this.page.screenshot({ path: `${screenshotPath}/04_member-form-filled.png` });
  }

  async saveMember(screenshotPath) {
    await this.page.click(this.saveButton);
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: `${screenshotPath}/05_member-saved.png` });
  }

  async verifyMemberCreation(screenshotPath) {
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: `${screenshotPath}/06_member-creation-verified.png` });
  }

  async retryCreateMember(name, email, screenshotPath) {
    await this.page.fill(this.memberNameInput, name);
    await this.page.fill(this.memberEmailInput, email);
    await this.page.screenshot({ path: `${screenshotPath}/06_member-form-filled-corrected.png` });
  }

  async retrySaveMember(screenshotPath) {
    await this.page.click(this.saveButton);
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: `${screenshotPath}/07_member-saved-corrected.png` });
  }

  async verifyEmailFieldBorder(screenshotPath) {
    try {
      const hasErrorClass = await page.isVisible(`${memberEmailInput}.error`);
      if (hasErrorClass) {
        console.log('El borde rojo sigue presente, hay un error de validación.');
        await this.page.screenshot({ path: `${screenshotPath}/08_red-border-still-present.png` });
      }
      else {
        console.log('El borde rojo ha desaparecido, el correo es válido ahora.');
        await this.page.screenshot({ path: `${screenshotPath}/08_red-border-removed.png` });
      }
    } catch (error) {
      console.log('El borde rojo sigue presente, hay un error de validación.');
      await this.page.screenshot({ path: `${screenshotPath}/08_red-border-not-removed.png` });
    }
  }

  async retryVerifyMemberCreated(screenshotPath) {
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: `${screenshotPath}/09_member-creation-verified.png` });
  }
}

module.exports = MembersPage;
