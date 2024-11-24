/**
 * ### Funcionalidad 5: Modificar el correo electrónico de un suscriptor
 *
 * El usuario administrador del servidor Ghost puede modificar el correo electrónico de un usuario suscriptor de su
 * servicio Ghost para actualizar la información personal del usuario.
 *
 * [Link de Wiki](https://github.com/c4ts0up/MISW4103-202420-G26/wiki/Listado-de-Funcionalidades#funcionalidad-5-modificar-el-correo-electr%C3%B3nico-de-un-usuario-suscriptor)
 */

import {expect} from '@playwright/test';
import MembersPage from "./pages/membersPage";
import {config} from "./config/config";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";
import {test} from "./fixtures/dataGenerator";
import logger from "./utils/logger";
import {EMAIL_GENERATION_OPTIONS, NAME_GENERATION_OPTIONS} from "./data/memberProvider";

test.describe('F5', async () => {

    /**
     * ### E8: Cambiar el correo de un miembro por un correo válido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro X creado
     * WHEN selecciono el miembro X
     * AND cambio el correo por un correo válido
     * AND guardo la edición del miembro
     * THEN se deberia guardar el nuevo correo
     * AND se debería mostrar el mensaje "Saved"
     */
    const e8 = 'E008-correo-valido';
    test(e8, async ( { page, browserName, dataProvider } ) => {
        const membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = dataProvider.memberProvider.getValidName();
        const mockEmail = dataProvider.memberProvider.getValidEmail();
        const mockValidEmail = dataProvider.memberProvider.getValidEmail();

        logger.info(`mockName = ${mockName}`);
        logger.info(`mockEmail = ${mockEmail}`);
        logger.info(`mockValidEmail = ${mockValidEmail}`);

        // GIVEN estoy loggeado como administrador
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e8,
                "01-login"
            )
        );

        // AND estoy en la página de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e8,
                "02-pagina-miembros"
            )
        );

        // AND hay un miembro creado
        await membersPage.createMember(
            mockName,
            mockEmail
        );
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e8,
                "03-miembro-creado"
            )
        );
        await membersPage.navigateTo();


        // before screenshot
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e8,
                "04-before-when"
            )
        );

        // WHEN selecciono un miembro
        const selectedMember = await membersPage.findMember(mockEmail);

        // AND cambio el correo por un correo válido
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            selectedMember,
            mockName,
            mockValidEmail
        );
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e8,
                "05-edit-member"
            )
        );

        // THEN se debería mostrar el mensaje "Saved"
        expect(saveButtonResponse.trim()).toEqual('Saved');
        // AND se debería guardar el nuevo correo
        await membersPage.reload();
        const emailInput = await membersPage.getEmailInputLocator();
        await expect(emailInput).toHaveValue(mockValidEmail);

        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e8,
                "06-after-validations"
            )
        );
    });


    /**
     * E9: Cambiar el correo de un miembro por un correo inválido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro X creado
     * WHEN selecciono el miembro X
     * AND cambio el correo por un correo inválido
     * AND guardo la edición del miembro
     * THEN se debería mostrar el mensaje "Retry"
     * AND se debería mostrar el mensaje "Invalid Email."
     * AND no se debería guardar el nuevo correo
     */
    const e9 = "E009-correo-invalido"
    test(e9, async ( { page, browserName, dataProvider } ) => {
        const membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = dataProvider.memberProvider.getValidName();
        const mockEmail = dataProvider.memberProvider.getValidEmail();
        const mockInvalidEmail = dataProvider.memberProvider.getInvalidEmail(EMAIL_GENERATION_OPTIONS.NO_AT);

        logger.info(`mockName = ${mockName}`);
        logger.info(`mockEmail = ${mockEmail}`);
        logger.info(`mockInvalidEmail = ${mockInvalidEmail}`);

        // GIVEN estoy loggeado como administrador
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e9,
                "01-login"
            )
        );

        // AND estoy en la página de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e9,
                "02-pagina-miembros"
            )
        );

        // AND hay un miembro creado
        await membersPage.createMember(
            mockName,
            mockEmail
        );
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e9,
                "03-miembro-creado"
            )
        );
        await membersPage.navigateTo();

        // before screenshot
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e9,
                "04-before-when"
            )
        );

        // WHEN selecciono un miembro
        const selectedMember = await membersPage.findMember(mockEmail);

        // AND cambio el correo por un correo inválido
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            selectedMember,
            mockName,
            mockInvalidEmail
        );
        // after screenshot
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e9,
                "05-edit-member"
            )
        );

        // THEN se debería mostrar el mensaje "Retry"
        expect(saveButtonResponse.trim()).toEqual('Retry');
        // AND se debería mostrar el mensaje "Invalid Email."
        const getEmailSaveResponse = await membersPage.getEmailSaveResponse();
        await expect(getEmailSaveResponse).toHaveText('Invalid Email.')
        // AND no se debería guardar el nuevo correo
        await membersPage.reload();
        const emailInput = await membersPage.getEmailInputLocator();
        await expect(emailInput).toHaveValue(mockEmail);

        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e9,
                "06-after-validations"
            )
        );
    });


    /**
     * E10: Correo repetido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro X creado
     * AND hay un miembro Y creado
     * WHEN selecciono el miembro Y
     * AND cambio el correo por el correo de X
     * AND guardo la edición del miembro
     * THEN se debería mostrar el mensaje "Retry"
     * AND se debería mostrar el mensaje "Member already exists. Attempting to add member with existing email address"
     * AND no se debería guardar el nuevo correo
     */
    const e10 = "E010-correo-repetido";
    test(e10, async ( { page, browserName, dataProvider } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const xMockName = dataProvider.memberProvider.getValidName();
        const xMockEmail = dataProvider.memberProvider.getValidEmail();
        const yMockName = dataProvider.memberProvider.getValidName();
        const yMockEmail = dataProvider.memberProvider.getValidEmail();

        logger.info(`xMockName = ${xMockName}`);
        logger.info(`xMockEmail = ${xMockEmail}`);
        logger.info(`yMockName = ${yMockName}`);
        logger.info(`yMockEmail = ${yMockEmail}`);


        // GIVEN estoy loggeado como administrador
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "01-login"
            )
        );

        // AND estoy en la página de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "02-pagina-miembros"
            )
        );

        // AND hay un miembro X creado
        await membersPage.createMember(
            xMockName,
            xMockEmail
        );
        const saveButtonResponseMemberX = await membersPage.saveMemberChanges();
        expect(saveButtonResponseMemberX.trim()).toEqual('Saved');
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "03-miembro-x-creado"
            )
        );
        await membersPage.navigateTo();

        // AND hay un miembro Y creado
        await membersPage.createMember(
            yMockName,
            yMockEmail
        );
        const saveButtonResponseMemberY = await membersPage.saveMemberChanges();
        expect(saveButtonResponseMemberY.trim()).toEqual('Saved');
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "04-miembro-y-creado"
            )
        );
        await membersPage.navigateTo();

        // before screenshot
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "05-before-when"
            )
        );

        // WHEN selecciono el miembro Y
        const yMember = await membersPage.findMember(yMockEmail);
        // AND cambio el correo por el correo de X
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            yMember,
            yMockName,
            xMockEmail
        )
        // after screenshot
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "06-edit-member"
            )
        );

        // THEN se debería mostrar el mensaje "Retry"
        // FIXME: la aplicación muestra brevemente (~50 ms) "Saved", antes de cambiar a "Retry"
        expect(membersPage.saveChangesTest())
        const saveButton = await membersPage.saveChangesTest();
        await expect(saveButton).toContainText('Retry')

        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "07-mensaje-retry"
            )
        );

        // AND se debería mostrar el mensaje "Member already exists. Attempting to add member with existing email address"
        const getEmailSaveResponse = await membersPage
            .getEmailSaveResponse();
        await expect(getEmailSaveResponse).toContainText(
            'Member already exists. Attempting to edit member with existing email address'
        );
        // AND no se debería guardar el nuevo correo
        await membersPage.reload();
        const emailInput = await membersPage.getEmailInputLocator();
        await expect(emailInput).toHaveValue(yMockEmail);

        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e10,
                "08-after-validations"
            )
        );
    });
});




