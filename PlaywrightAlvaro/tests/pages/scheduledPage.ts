import {BasePage} from "./basePage";
import {Page} from "playwright";

class ScheduledPage extends BasePage {
    private readonly dismissButton = 'button.gh-btn.gh-btn-primary.dismiss';

    constructor(page: Page, resource: string) {
        super(page, resource);
    }

    async reviewScheduledPosts(url) {
        await this.page.click(this.dismissButton, { force: true });
        await this.page.waitForTimeout(1000);
        await this.page.goto(url);
        await this.page.waitForTimeout(3000);
    }
}

export default ScheduledPage;