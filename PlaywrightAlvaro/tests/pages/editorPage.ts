import {BasePage} from "./basePage";
import {Page} from "playwright";

/**
 * Representa la página de edición de posts
 */
class EditorPage extends BasePage {
    private readonly postTitleInput = 'textarea[placeholder="Post title"]';
    private readonly editorSelector = '.koenig-react-editor .koenig-lexical';
    private readonly publishButton = 'button.gh-btn.gh-btn-editor.gh-publish-trigger';
    private readonly publishSettingButton = 'div[data-test-setting="publish-at"] button.gh-publish-setting-title';
    private readonly scheduleRadio = 'div.gh-radio:has(div[data-test-radio="schedule"]) label';
    private readonly dateInput = 'input[data-test-date-time-picker-date-input]';
    private readonly timeInput = 'input[data-test-date-time-picker-time-input]';
    private readonly continueButton = 'button[data-test-button="continue"]';
    private readonly confirmScheduleButton = '.gh-publish-cta .gh-btn-pulse';

    constructor(page: Page, resource: string) {
        super(page, resource);
    }

    async createPost(title: string, content: string) {
        await this.page.fill(this.postTitleInput, title);
        await this.page.click(this.editorSelector);
        await this.page.keyboard.type(content);
    }

    async publishPost() {
        await this.page.click(this.publishButton);
        await this.page.waitForTimeout(3000);
    }

    async changePostReleaseDate() {
        await this.page.click(this.publishSettingButton);
        await this.page.waitForTimeout(100);
    }

    async fillScheduleData(date: string, time: string) {
        await this.page.click(this.scheduleRadio);
        await this.page.waitForTimeout(100);
        await this.page.fill(this.dateInput, date);
        await this.page.fill(this.timeInput, time);
    }

    async confirmSchedulePost() {
        await this.page.click(this.continueButton);
        await this.page.waitForTimeout(100);
    }

    async publishScheduledPost() {
        await this.page.waitForSelector(this.confirmScheduleButton, { state: 'visible', timeout: 5000 });
        await this.page.click(this.confirmScheduleButton, { force: true });
        await this.page.waitForTimeout(3000);
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

export default EditorPage;