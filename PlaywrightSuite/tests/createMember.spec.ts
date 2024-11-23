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

import {expect, test} from "@playwright/test";
import MembersPage from "./pages/membersPage";
import {config} from "./config/config";
import {member_content_pe3, member_content_pe4} from "./data/blog";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";

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
    test(e3, async ( { page, browserName } ) => {
        const membersPage = new MembersPage(page, config.membersPage.resource)

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
        await membersPage.createMember(
            member_content_pe3.name,
            member_content_pe3.email
        );
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
        const createdMember = await membersPage.findMember(member_content_pe3.email);
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
     * ### E4: Crear un nuevo miembro con un correo inválido
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
    const e4 = 'E004-create-invalid-member';
    test(e4, async ( { page, browserName } ) => {
        test.slow();
        const membersPage = new MembersPage(page, config.membersPage.resource)

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
        await membersPage.createMember(
            member_content_pe4.name,
            member_content_pe4.email_invalid
        );
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
        await membersPage.inputEmail(member_content_pe4.email_valid);
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

        const createdMember = await membersPage.findMember(member_content_pe3.email);
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