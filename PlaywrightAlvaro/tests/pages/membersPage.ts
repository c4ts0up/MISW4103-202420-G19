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

    async findMember(memberEmail: string) {
        // Wait for the member list to be present in the DOM
        const memberTable = this.page.locator("p[class$='gh-members-list-email']");

        // Wait for the memberTable to be attached to the DOM before counting
        await memberTable.waitFor({ state: 'attached' });

        // Get the count of the member table
        const memberCount = await memberTable.count();
        console.debug(`Members: ${memberCount}`);

        // If no members are found, return null
        if (memberCount === 0) {
            return null;
        }

        // Locate the specific member using the memberEmail with the text match
        const filteredMember = memberTable.locator(`text=${memberEmail}`);

        // Check if the filtered member exists
        const filteredMemberCount = await filteredMember.count();
        console.debug(`Selected: ${filteredMemberCount}`);

        if (filteredMemberCount === 0) {
            return null;
        }

        // Check if the filtered member is visible
        if (await filteredMember.isVisible()) {
            return filteredMember;
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
        if (!(await this.findMember(memberEmail))) {
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