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
    private confirmDeleteMemberButton = "button[data-test-button='confirm']"

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
            console.log(`Miembro ${memberEmail} no encontrado`);
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

    }

    async inputName(newName: string) {
        await expect(this.page.getByLabel(this.nameInputLabel)).toBeVisible()
        await this.page.fill(this.nameInput, newName);
    }

    async inputEmail(newEmail: string) {
        await expect(this.page.getByLabel(this.emailInputLabel)).toBeVisible();
        await this.page.fill(this.emailInput, newEmail);
    }

    async saveMemberChanges() {
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
        return await this.saveMemberChanges();
    }


    async selectMemberActions() {
        await this.page.click(this.memberActionsButton);
    }

    async deleteMember(
        memberElement: Locator
    ) {
        // selecciona el miembro
        await memberElement.click();

        // clic en member actions
        await this.page
            .locator(this.memberActionsButton)
            .click();

        // clic en delete member
        await this.page
            .locator(this.deleteMemberButton)
            .click();

        // clic en confirmar
        await this.page
            .locator(this.confirmDeleteMemberButton)
            .click();
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

    async getEmailSaveResponse() {
        return this.page.locator('div[class$=\'error\'] p.response');
    }

    async checkRedirection(desiredResource: string) {
        await this.page.waitForURL(desiredResource)
    }
}


export default MembersPage;