import {BasePage} from "./basePage";
import {Page} from "playwright";

/**
 * Representa la página de los posts programados
 */
class ScheduledPage extends BasePage {
    private readonly dismissButton = 'button.gh-btn.gh-btn-primary.dismiss';

    constructor(page: Page, resource: string) {
        super(page, resource);
    }

    async reviewScheduledPosts() {
        await this.page.click(this.dismissButton, { force: true });
        await this.page.waitForTimeout(1000);
        await this.navigateTo();
        await this.page.waitForTimeout(3000);
    }
}

export default ScheduledPage;