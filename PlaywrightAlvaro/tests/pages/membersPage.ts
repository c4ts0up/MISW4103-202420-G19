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
    private readonly saveButton = "button[data-test-button='save']"

    // span
    private readonly failedSave = "span[data-test-task-button-state='failure']";

    constructor(page: Page, url: string) {
        super(page, url);
    }

    async findMember(memberName: string) {
        const divMembers = this.page.locator("div[data-test-table='members']");
        const divTableBody = divMembers.locator("tbody");
        const usernames = divTableBody.locator("tr > a > div > div > h3");

        const selectedMember = usernames.locator(`text=${memberName}`);

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
        await this.page.click(this.saveButton);

        await this.page.waitForFunction(() => {
            return document.body.innerHTML.length > 0; // Checks if the HTML has been updated
        }, { timeout: 10000 });
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

    async validateChanges({
        saveButtonResponse = null,
        nameResponse = null,
        emailResponse = null
                          }: {
        saveButtonResponse?: string | null,
        nameResponse?: string | null,
        emailResponse?: string | null
    }) {
        if (saveButtonResponse) {
            const button = this.page.locator(this.saveButton);
            const span = button.locator(this.failedSave);

            await expect(span).toBeVisible();
            await expect(span).toHaveText(saveButtonResponse);
        }

        if (nameResponse) {
            // No hay un caso inválido hallado para el nombre
        }

        if (emailResponse) {
            const divMemberDetails = this.page.locator("div[class='gh-cp-member-email-name']")
            const divEmail = divMemberDetails.locator("label[for='member-email']").locator("..");
            const errorResponse = divEmail.locator("div[class$='error'] p");

            await expect(errorResponse).toBeVisible();
            await expect(errorResponse).toHaveText(emailResponse);
        }
    }
}

export default MembersPage;