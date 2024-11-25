/**
 * ### Funcionalidad: 7: Agregar un miembro a la página
 *
 * La funcionalidad de agregar un miembro a la página permite a los administradores incluir nuevos usuarios en su sitio
 * de Ghost como suscriptores. Esto significa que los usuarios pueden registrarse para recibir actualizaciones,
 * newsletters y acceso a contenido exclusivo, sin necesariamente tener permisos de edición o colaboración en el sitio.
 *
 * [Link de Wiki](https://github.com/c4ts0up/MISW4103-202420-G26/wiki/Listado-de-Funcionalidades#funcionalidad-7-agregar-un-miembro-a-la-p%C3%A1gina)
 *
 */

import {expect} from "@playwright/test";
import MembersPage from "./pages/membersPage";
import {config} from "./config/config";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";
import {test} from "./fixtures/dataGenerator";
import logger from "./utils/logger";
import {EMAIL_GENERATION_OPTIONS} from "./data/memberProvider";

test.describe('F7', async () => {

    /**
     * ### E3: Crear un nuevo miembro con un correo válido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de creación de miembros
     * WHEN creo un nuevo miembro
     * AND agrego datos válidos
     * AND cambio el correo por un correo válido
     * AND guardo el nuevo miembro
     * THEN el nuevo miembro debería aparecer en la lista de miembros
     */
    const e3 = 'E003-create-valid-member';
    test(e3, async ( { page, browserName, dataProvider } ) => {
        const membersPage = new MembersPage(page, config.membersPage.resource)

        const mockName = dataProvider.memberProvider.getValidName();
        const mockEmail = dataProvider.memberProvider.getValidEmail();

        logger.info(`mockName = ${mockName}`);
        logger.info(`mockEmail = ${mockEmail}`);

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de creación de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e3,
                "01-members-page"
            )
        );

        // AND agrego datos válidos
        // AND cambio el correo por un correo válido
        await membersPage.createMember(mockName, mockEmail);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e3,
                "02-create-member"
            )
        );
        // AND guardo el nuevo miembro
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e3,
                "03-member-saved"
            )
        );

        // THEN el nuevo miembro debería aparecer en la lista de miembros
        await membersPage.navigateTo();
        await membersPage.reload();
        const createdMember = await membersPage.findMember(mockEmail);
        expect(createdMember).not.toBeNull();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e3,
                "04-members-page"
            )
        );
    });


    /**
     * ### E4: Crear un nuevo miembro con un correo inválido (sin arroba)
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de creación de miembros
     * WHEN creo un nuevo miembro
     * AND agrego datos válidos
     * AND cambio el correo por un correo inválido
     * AND guardo el nuevo miembro
     * AND cambio el correo por un correo válido
     * AND guardo el nuevo miembro
     * THEN el borde rojo del campo de correo debería desaparecer
     * AND el nuevo miembro debería aparecer en la lista de miembros
     */
    const e4 = 'E004-create-invalid-member-sin-arroba';
    test(e4, async ( { page, browserName, dataProvider } ) => {
        test.slow();
        const membersPage = new MembersPage(page, config.membersPage.resource)

        const mockName = dataProvider.memberProvider.getValidName();
        const mockInvalidEmail = dataProvider.memberProvider.getInvalidEmail(EMAIL_GENERATION_OPTIONS.NO_AT);
        const mockValidEmail = dataProvider.memberProvider.getValidEmail();

        logger.info(`mockName = ${mockName}`);
        logger.info(`mockInvalidEmail = ${mockInvalidEmail}`);
        logger.info(`mockValidEmail = ${mockValidEmail}`);

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de creación de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "01-members-page"
            )
        );

        // AND agrego datos válidos
        // AND cambio el correo por un correo inválido
        await membersPage.createMember(mockName, mockInvalidEmail);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "02-create-member"
            )
        );
        // AND guardo el nuevo miembro
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "03-member-saved"
            )
        );

        // AND cambio el correo por un correo válido
        await membersPage.inputEmail(mockValidEmail);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "04-changed-to-valid-email"
            )
        );

        // AND guardo el nuevo miembro
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "05-member-saved"
            )
        );

        // THEN el borde rojo del campo de correo debería desaparecer
        // (si hay borde rojo, este se hereda de la clase .error)
        await membersPage.validateNoErrors();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "06-validate-no-errors"
            )
        );

        // AND el nuevo miembro debería aparecer en la lista de miembros
        await membersPage.navigateTo();
        await membersPage.reload();

        const createdMember = await membersPage.findMember(mockValidEmail);
        expect(createdMember).not.toBeNull();

        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "07-members-page"
            )
        );
    });


    /**
     * ### E14: Crear un nuevo miembro con un correo inválido (sin dominio)
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de creación de miembros
     * WHEN creo un nuevo miembro
     * AND agrego datos válidos
     * AND cambio el correo por un correo inválido
     * AND guardo el nuevo miembro
     * AND cambio el correo por un correo válido
     * AND guardo el nuevo miembro
     * THEN el borde rojo del campo de correo debería desaparecer
     * AND el nuevo miembro debería aparecer en la lista de miembros
     */
    const e14 = 'E014-create-invalid-member-sin-dominio';
    test(e14, async ( { page, browserName, dataProvider } ) => {
        test.slow();
        const membersPage = new MembersPage(page, config.membersPage.resource)

        const mockName = dataProvider.memberProvider.getValidName();
        const mockInvalidEmail = dataProvider.memberProvider.getInvalidEmail(EMAIL_GENERATION_OPTIONS.NO_DOMAIN);
        const mockValidEmail = dataProvider.memberProvider.getValidEmail();

        logger.info(`mockName = ${mockName}`);
        logger.info(`mockInvalidEmail = ${mockInvalidEmail}`);
        logger.info(`mockValidEmail = ${mockValidEmail}`);

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de creación de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "01-members-page"
            )
        );

        // AND agrego datos válidos
        // AND cambio el correo por un correo inválido
        await membersPage.createMember(mockName, mockInvalidEmail);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "02-create-member"
            )
        );
        // AND guardo el nuevo miembro
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "03-member-saved"
            )
        );

        // AND cambio el correo por un correo válido
        await membersPage.inputEmail(mockValidEmail);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "04-changed-to-valid-email"
            )
        );

        // AND guardo el nuevo miembro
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "05-member-saved"
            )
        );

        // THEN el borde rojo del campo de correo debería desaparecer
        // (si hay borde rojo, este se hereda de la clase .error)
        await membersPage.validateNoErrors();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "06-validate-no-errors"
            )
        );

        // AND el nuevo miembro debería aparecer en la lista de miembros
        await membersPage.navigateTo();
        await membersPage.reload();

        const createdMember = await membersPage.findMember(mockValidEmail);
        expect(createdMember).not.toBeNull();

        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "07-members-page"
            )
        );
    });

    /**
     * ### E15: Crear un nuevo miembro con un correo inválido (demasiado largo)
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de creación de miembros
     * WHEN creo un nuevo miembro
     * AND agrego datos válidos
     * AND cambio el correo por un correo inválido
     * AND guardo el nuevo miembro
     * AND cambio el correo por un correo válido
     * AND guardo el nuevo miembro
     * THEN el borde rojo del campo de correo debería desaparecer
     * AND el nuevo miembro debería aparecer en la lista de miembros
     */
    const e15 = 'E015-create-invalid-member-muy-largo';
    test(e15, async ( { page, browserName, dataProvider } ) => {
        test.slow();
        const membersPage = new MembersPage(page, config.membersPage.resource)

        const mockName = dataProvider.memberProvider.getValidName();
        const mockInvalidEmail = dataProvider.memberProvider.getInvalidEmail(EMAIL_GENERATION_OPTIONS.LONG);
        const mockValidEmail = dataProvider.memberProvider.getValidEmail();

        logger.info(`mockName = ${mockName}`);
        logger.info(`mockInvalidEmail = ${mockInvalidEmail}`);
        logger.info(`mockValidEmail = ${mockValidEmail}`);

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de creación de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "01-members-page"
            )
        );

        // AND agrego datos válidos
        // AND cambio el correo por un correo inválido
        await membersPage.createMember(mockName, mockInvalidEmail);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "02-create-member"
            )
        );
        // AND guardo el nuevo miembro
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "03-member-saved"
            )
        );

        // AND cambio el correo por un correo válido
        await membersPage.inputEmail(mockValidEmail);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "04-changed-to-valid-email"
            )
        );

        // AND guardo el nuevo miembro
        await membersPage.saveMemberChanges();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "05-member-saved"
            )
        );

        // THEN el borde rojo del campo de correo debería desaparecer
        // (si hay borde rojo, este se hereda de la clase .error)
        await membersPage.validateNoErrors();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "06-validate-no-errors"
            )
        );

        // AND el nuevo miembro debería aparecer en la lista de miembros
        await membersPage.navigateTo();
        await membersPage.reload();

        const createdMember = await membersPage.findMember(mockValidEmail);
        expect(createdMember).not.toBeNull();

        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e4,
                "07-members-page"
            )
        );
    });
});