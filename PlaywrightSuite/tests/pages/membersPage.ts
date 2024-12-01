import {Page} from "playwright";
import {BasePage} from "./basePage";
import {expect, Locator} from "@playwright/test";
import logger from "../utils/logger";

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
    private confirmDeleteMemberButton = "button[data-test-button='confirm']"

    // cubre el botón de Save
    private readonly saveButton = "button[data-test-button='save']"
    private readonly memberActionsButton = "button[data-test-button='member-actions']";
    private readonly deleteMemberButton = "button[data-test-button='delete-member']";

    // selectores CSS
    private readonly errorSelector = ".error";


    constructor(page: Page, resource: string) {
        super(page, resource);
    }

    private initialEmailPosition: { x: number; y: number } | null = null;

    async captureEmailPosition() {
        logger.info(`Capturing initial position of email input field`);

        const emailInputLocator = this.page.locator(this.emailInput);
        const boundingBox = await emailInputLocator.boundingBox();

        if (!boundingBox) {
            throw new Error("Unable to retrieve the initial position of the email input field.");
        }

        this.initialEmailPosition = { x: boundingBox.x, y: boundingBox.y };
        logger.info(`Initial position captured: x=${boundingBox.x}, y=${boundingBox.y}`);
    }

    async validateEmailPositionUnchangedAfterModification() {
        logger.info(`Validating email field position remains unchanged after modification`);
    
        if (!this.initialEmailPosition) {
            throw new Error("Initial position of email input field was not captured. Call captureEmailPosition() first.");
        }
    
        const emailInputLocator = this.page.locator(this.emailInput);
        const currentPosition = await emailInputLocator.boundingBox();
    
        if (!currentPosition) {
            throw new Error("Unable to retrieve the current position of the email input field.");
        }
    
        // Comparar posiciones inicial y final
        expect(currentPosition.x).toBeCloseTo(this.initialEmailPosition.x, 1); // Validar posición X
        expect(currentPosition.y).toBeCloseTo(this.initialEmailPosition.y, 1); // Validar posición Y
    
        logger.info(`Email field position remains unchanged: x=${currentPosition.x}, y=${currentPosition.y}`);
    }
    

    async findMember(memberEmail: string) {
        logger.info(`Searching for member with memberEmail = ${memberEmail}`);
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
        logger.info(`Editing member with newName = ${newName}, newEmail = ${newEmail}`)
        // selecciona el miembro
        await memberElement.click();

        await this.inputName(newName);
        await this.inputEmail(newEmail);

        return await this.saveMemberChanges();

    }

    async inputName(newName: string) {
        logger.info(`Filling name = ${newName}`);
        await expect(this.page.getByLabel(this.nameInputLabel)).toBeVisible()
        await this.page.fill(this.nameInput, newName);
    }

    async inputEmail(newEmail: string) {
        logger.info(`Filling email = ${newEmail}`);
        await expect(this.page.getByLabel(this.emailInputLabel)).toBeVisible();
        await this.page.fill(this.emailInput, newEmail);
    }

    async saveMemberChanges() {
        logger.info(`Saving member changes`);
        const buttonLocator = this.page.locator(this.saveButton);
        const initialText = await buttonLocator.textContent();

        await buttonLocator.click();
        if (initialText !== null) {
            await expect(buttonLocator).not.toHaveText(initialText);
        }

        return await buttonLocator.textContent();
    }

    async saveChangesTest() {
        logger.info(`Saving member changes (second option)`);
        await this.page
            .locator(this.saveButton)
            .click()

        return this.page.locator(this.saveButton);
    }

    async createMember(memberName: string, memberEmail: string) {
        logger.info(`Creating member with memberName = ${memberName}, memberEmail = ${memberEmail}`);
        // espera a que botón "New Member" sea visible
        await this.page
            .getByRole('link', { name: this.newMemberLabel })
            .click();

        // espera a que sean visibles los botones
        await this.inputName(memberName);
        await this.inputEmail(memberEmail);
    }


    async deleteMember(
        memberElement: Locator
    ) {
        logger.info(`Deleting member`);
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

    async getEmailInputLocator() {
        logger.info("Get email input locator");
        return this.page
            .getByLabel(this.emailInputLabel);
    }

    async getEmailSaveResponse() {
        logger.info(`Get email save response`);
        return this.page.locator('div[class$=\'error\'] p.response');
    }

    async checkRedirection(desiredResource: string) {
        logger.info(`Check redirection to ${desiredResource}`);
        await this.page.waitForURL(desiredResource)
    }

    async validateNoErrors() {
        logger.info(`Validating no errors are present in membersPage`);
        return expect(this.page.locator(this.errorSelector)).toHaveCount(0);
    }
}


export default MembersPage;