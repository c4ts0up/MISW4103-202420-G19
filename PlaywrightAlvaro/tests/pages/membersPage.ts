import {Page} from "playwright";
import {BasePage} from "./basePage";
import {expect, Locator} from "@playwright/test";

/**
 * Representa la página de miembros + edición de miembros
 */
class MembersPage extends BasePage {
    // labels
    private readonly newMemberLabel = "New member";
    private readonly nameInputLabel = "Name";
    private readonly emailInputLabel = "Email";


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

    constructor(page: Page, resource: string) {
        super(page, resource);
    }

    async findMember(memberEmail: string) {
        // wait for members to load
        const memberElement = this.page.getByText(memberEmail);


        try{
            await expect(memberElement).toHaveCount(1);
            return memberElement;
        } catch (error) {
            return null;
        }
    }


    async editMember(
        memberElement: Locator,
        newName: string,
        newEmail: string
    ) {
        // selecciona el miembro
        await memberElement.click();

        await this.inputName(newName);
        await this.inputEmail(newEmail);

        return await this.saveMemberChanges();

        // Locate the span with the text "Leave"
        const leaveButton = this.page.locator('span', { hasText: 'Leave' });

        // Check if the span exists
        const leaveButtonCount = await leaveButton.count();

        if (leaveButtonCount > 0) {
            // If the span exists, click on it
            await leaveButton.click();
            console.log('Leave button clicked');
        } else {
            console.log('Leave button does not exist');
        }

        await this.page.waitForLoadState("load");
    }

    async inputName(newName: string) {
        await expect(this.page.getByLabel(this.nameInputLabel)).toBeVisible()
        await this.page.fill(this.nameInput, newName);
    }

    async inputEmail(newEmail: string) {
        await expect(this.page.getByLabel(this.emailInputLabel)).toBeVisible();
        await this.page.fill(this.emailInput, newEmail);
    }

    async saveMemberChanges(): Promise<string> {
        const buttonLocator = this.page.locator(this.saveButton);
        const initialText = await buttonLocator.textContent();

        await buttonLocator.click();
        await expect(buttonLocator).not.toHaveText(initialText);

        return await buttonLocator.textContent();
    }

    async checkSaveButtonMessage(desiredMessage: string) {
        await expect(this.page.locator(this.saveButton).locator('span')).toHaveText(desiredMessage);
    }

    async createMember(memberName: string, memberEmail: string) {
        // espera a que botón "New Member" sea visible
        await this.page
            .getByRole('link', { name: this.newMemberLabel })
            .click();

        // espera a que sean visibles los botones
        await this.inputName(memberName);
        await this.inputEmail(memberEmail);

        // guardar
        const saveButtonResponse = await this.saveMemberChanges();
        //
        // // Locate the span with the text "Leave"
        // const leaveButton = this.page.locator('span', { hasText: 'Leave' });
        //
        // // Check if the span exists
        // const leaveButtonCount = await leaveButton.count();
        //
        // if (leaveButtonCount > 0) {
        //     // If the span exists, click on it
        //     await leaveButton.click();
        //     console.log('Leave button clicked');
        // } else {
        //     console.log('Leave button does not exist');
        // }
    }

    async baseCreateMember(memberName: string, memberEmail: string) {
        // new member
        await this.page.click(this.newMemberButton);

        await this.inputName(memberName);
        await this.inputEmail(memberEmail);
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

        await this.page.waitForLoadState("load");

        await this.page
            .locator("button[data-test-button='confirm']")
            .locator('span')
            .click();

        // Locate the span with the text "Leave"
        const leaveButton = this.page.locator('span', { hasText: 'Leave' });

        // Check if the span exists
        const leaveButtonCount = await leaveButton.count();

        if (leaveButtonCount > 0) {
            // If the span exists, click on it
            await leaveButton.click();
            console.log('Leave button clicked');
        } else {
            console.log('Leave button does not exist');
        }

        await this.page.waitForURL("**/members")
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