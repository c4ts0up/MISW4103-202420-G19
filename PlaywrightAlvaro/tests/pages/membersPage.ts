import {Page} from "playwright";
import {BasePage} from "./basePage";
import {expect} from "@playwright/test";

/**
 * Representa la página de miembros + edición de miembros
 */
class MembersPage extends BasePage {
    // fields
    private readonly nameInput = "input[data-test-input='member-name']";
    private readonly emailInput = "input[data-test-input='member-email']";

    // buttons
    private readonly newMemberButton = "a[data-test-new-member-button='true']";
    // cubre el botón de Save
    private readonly saveButton = "button[data-test-button='save']"
    private readonly memberActionsButton = "button[data-test-button='member-actions']";
    private readonly deleteMemberButton = "button[data-test-button='delete-member']";

    // span
    private readonly failedSave = "span[data-test-task-button-state='failure']";

    constructor(page: Page, url: string) {
        super(page, url);
    }

    async findMember(memberName: string) {
        const divMembers = this.page.locator("div[data-test-table='members']");
        const divTableBody = divMembers.locator("table >> tbody");
        const usernames = divTableBody.locator("tr > a > div > div > h3");

        const selectedMember = usernames.locator(`text=${memberName}`);
        // FIXME: si no existe, se muere
        await expect(selectedMember).toBeVisible();

        if (await selectedMember.isVisible()) {
            return selectedMember;
        }
        return null;
    }

    async editMember(memberName: string) {
        const selectedMember = await this.findMember(memberName);

        // can't edit a 404 member
        expect(selectedMember).not.toBeNull();

        const link = selectedMember.locator("../..");

        await link.click();
    }

    async inputName(newName: string) {
        await this.page.fill(this.nameInput, newName);
    }

    async inputEmail(newEmail: string) {
        await this.page.fill(this.emailInput, newEmail);
    }

    async saveMemberChanges() {
        const save = this.page.locator(this.saveButton);
        const span = save.locator('span');
        await span.click();
    }

    async checkSaveButtonMessage(desiredMessage: string) {
        await expect(this.page.locator(this.saveButton).locator('span')).toHaveText(desiredMessage);
    }

    async createMember(memberName: string, memberEmail: string) {
        // new member
        await this.page.click(this.newMemberButton);

        await this.inputName(memberName);
        await this.inputEmail(memberEmail);
        await this.saveMemberChanges();

        // returns to main page
        await this.navigateTo();
    }


    async createMemberIfMissing(memberName: string, memberEmail: string) {
        if (!await this.findMember(memberName)) {
            await this.createMember(memberName, memberEmail);
        }
    }

    async selectMemberActions() {
        await this.page.click(this.memberActionsButton);
    }

    async deleteMember() {
        await this.selectMemberActions();
        await this.page
            .locator(this.deleteMemberButton)
            .locator('span')
            .click();

        await this.page
            .locator("button[data-test-button='confirm']")
            .locator('span')
            .click();

        await this.page.waitForLoadState('load');
    }

    async validateChanges({
        saveButtonResponse = null,
        nameResponse = null,
        emailResponse = null
                          }: {
        saveButtonResponse?: string | null,
        nameResponse?: string | null,
        emailResponse?: string | null
    }) {
        // Wait for any HTML change on the page
        await this.page.waitForFunction(() => document.body.innerHTML.length > 0);

        if (saveButtonResponse) {
            await this.checkSaveButtonMessage(saveButtonResponse);
        }

        if (nameResponse) {
            // No hay un caso inválido hallado para el nombre
        }

        if (emailResponse) {
            // flaky
            const errorResponse = this.page.locator("div[class$='error'] p");

            // Wait for the error message to appear
            await errorResponse.waitFor({ state: 'attached' });
            await errorResponse.waitFor({ state: 'visible' });

            // Validate the error message
            await expect(errorResponse).toBeVisible();
            await expect(errorResponse).toHaveText(emailResponse);
        }

    }
}

export default MembersPage;