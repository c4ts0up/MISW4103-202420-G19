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
    private readonly deleteMemberLabel = "Delete member";

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
        await this.page.getByLabel(this.nameInputLabel).fill(newName);
    }

    async inputEmail(newEmail: string) {
        await expect(this.page.getByLabel(this.emailInputLabel)).toBeVisible();
        await this.page.getByLabel(this.emailInputLabel).fill(newEmail)
    }

    async saveMemberChanges() {
        const spanSave = this.page
            .locator('span')
            .filter({
                hasText: /Save|Saved|Retry/
            });

        const initialText = await spanSave.textContent();

        await spanSave.click();

        await expect(spanSave).not.toHaveText(initialText);

        return await spanSave.textContent();
    }

    async saveChangesTest() {
        await this.page
            .locator('span')
            .filter({
                hasText: /Save|Saved|Retry/
            })
            .click()

        return this.page
            .locator('span')
            .filter({
                hasText: /Save|Saved|Retry/
            });
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


    async deleteMember(
        memberElement: Locator
    ) {
        // selecciona el miembro
        await memberElement.click();

        // clic en delete member
        await this.page
            .getByText(this.deleteMemberLabel)
            .click();

        // clic en confirmar
        await this.page
            .getByText(this.deleteMemberLabel, {exact: true})
            .nth(1)
            .click();
    }

    async getEmailInputLocator() {
        return this.page
            .getByLabel(this.emailInputLabel);
    }

    async getEmailSaveResponse(isAlert: boolean) {
        if (isAlert) {
            return this.page.locator('div[class=\'gh-alert-content\']');
        } else {
            return this.page.locator('p.response').filter({hasText: 'Invalid Email.'});
        }
    }

    async checkRedirection(desiredResource: string) {
        await this.page.waitForURL(desiredResource)
    }
}


export default MembersPage;