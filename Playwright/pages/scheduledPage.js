// pages/ScheduledPage.js
class ScheduledPage {
    constructor(page) {
      this.page = page;
      this.dismissButton = 'button.gh-btn.gh-btn-primary.dismiss';
    }
  
    async reviewScheduledPosts(url, screenshotPath) {
      await this.page.click(this.dismissButton, { force: true });
      await this.page.waitForTimeout(1000);
      await this.page.goto(url);
      await this.page.waitForTimeout(3000);
      await this.page.screenshot({ path: `${screenshotPath}/11_scheduled-posts.png` });
    }
  }
  
  module.exports = ScheduledPage;
  