// pages/EditorPage.js
class EditorPage {
  constructor(page) {
    this.page = page;
    this.postTitleInput = 'textarea[placeholder="Post title"]';
    this.editorSelector = '.koenig-react-editor .koenig-lexical';
    this.publishButton = 'button.gh-btn.gh-btn-editor.gh-publish-trigger';
    this.publishSettingButton = 'div[data-test-setting="publish-at"] button.gh-publish-setting-title';
    this.scheduleRadio = 'div.gh-radio:has(div[data-test-radio="schedule"]) label';
    this.dateInput = 'input[data-test-date-time-picker-date-input]';
    this.timeInput = 'input[data-test-date-time-picker-time-input]';
    this.continueButton = 'button[data-test-button="continue"]';
    this.confirmScheduleButton = '.gh-publish-cta .gh-btn-pulse';
  }

  async createPost(title, content, screenshotPath) {
    await this.page.fill(this.postTitleInput, title);
    await this.page.screenshot({ path: `${screenshotPath}/03_post-title-filled.png` });
    await this.page.click(this.editorSelector);
    await this.page.keyboard.type(content);
    await this.page.screenshot({ path: `${screenshotPath}/04_post-content-typed.png` });
  }

  async beginSchedulePost(screenshotPath) {
    await this.page.click(this.publishButton);
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: `${screenshotPath}/05_new-post-created.png` });

    await this.page.click(this.publishSettingButton);
    await this.page.waitForTimeout(100);
    await this.page.screenshot({ path: `${screenshotPath}/06_publish-setting-button-clicked.png` });
  }

  async fillScheduleData(date, time, screenshotPath) {
    await this.page.click(this.scheduleRadio);
    await this.page.screenshot({ path: `${screenshotPath}/07_schedule-radio-selected.png` });
    await this.page.waitForTimeout(100);
    await this.page.fill(this.dateInput, date);
    await this.page.fill(this.timeInput, time);
    await this.page.screenshot({ path: `${screenshotPath}/08_date-time-filled.png` });
  }

  async confirmSchedulePost(screenshotPath) {
    await this.page.click(this.continueButton);
    await this.page.screenshot({ path: `${screenshotPath}/09_continue-button-clicked.png` });
    await this.page.waitForTimeout(100);
  }

  async publishScheduledPost(screenshotPath) {
    await this.page.waitForSelector(this.confirmScheduleButton, { state: 'visible', timeout: 5000 });
    await this.page.click(this.confirmScheduleButton, { force: true });
    await this.page.waitForTimeout(3000);
    await this.page.screenshot({ path: `${screenshotPath}/10_post-scheduled.png` });
  }

  async publishInvalidScheduledPost(date, time, screenshotPath) {
    try {
      const errorMessage = await this.page.$(this.errorMessageSelector);
      if (errorMessage) {
        const messageText = await errorMessage.innerText();
        console.log('Error al programar la publicación con fecha/hora inválida:', messageText);
        await this.page.screenshot({ path: `${screenshotPath}/10_error_invalid_schedule.png` });
      } else {
        console.log('Error: no se recibió un mensaje de error cuando se ingresó una fecha/hora inválida.');
        await this.page.screenshot({ path: `${screenshotPath}/10_did_not_receive_error_invalid_schedule.png` });
      }
    } catch (error) {
      console.log('Error: no se recibió un mensaje de error cuando se ingresó una fecha/hora inválida.');
      await this.page.screenshot({ path: `${screenshotPath}/10_did_not_receive_error_invalid_schedule.png` });
    }
  }
}

module.exports = EditorPage;
