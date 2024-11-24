/**
 * ### Funcionalidad 3: Eliminar un miembro de la página
 *
 * El usuario administrador del servicio Ghost puede eliminar un usuario suscriptor de su servicio Ghost para que pierda
 * acceso a la cuenta de usuario suscrito y su funcionalidad correspondiente.
 *
 * [Link de wiki](https://github.com/c4ts0up/MISW4103-202420-G26/wiki/Listado-de-Funcionalidades#funcionalidad-3-eliminar-un-miembro-de-la-p%C3%A1gina)
 */

import {expect} from '@playwright/test';
import MembersPage from "./pages/membersPage";
import {config} from "./config/config";
import {faker} from "@faker-js/faker";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";
import {test} from "./fixtures/dataGenerator";

test.describe('F3', async () => {

    /**
     * E7: Borrado exitoso
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro creado
     * WHEN selecciono un miembro
     * AND borro el miembro
     * THEN redirige a la pagina principal
     * AND miembro no se puede hallar
     */
    const e7 = 'E007-delete-member';
    test(e7, async( { page, browserName, dataProvider } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();

        // GIVEN estoy loggeado como administrador
        await myScreenshot(page, screenshotPath(
            config.evidence.baseDirectory,
            config.sut.version,
            browserName,
            e7,
            "01-login"
        ));

        // AND estoy en la página de miembros
        await membersPage.navigateTo();
        await myScreenshot(page, screenshotPath(
            config.evidence.baseDirectory,
            config.sut.version,
            browserName,
            e7,
            "02-pagina-miembros"
        ));

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
            e7,
            "03-miembro-creado"
        ));
        await membersPage.navigateTo();

        // before screenshot
        await myScreenshot(page, screenshotPath(
            config.evidence.baseDirectory,
            config.sut.version,
            browserName,
            e7,
            "04-before-then"
        ));

        // WHEN selecciono un miembro
        const selectedMember = await membersPage.findMember(mockEmail)

        // AND borro el miembro
        await membersPage.deleteMember(
            selectedMember
        );

        // THEN redirige a la pagina principal
        await membersPage.checkRedirection(membersPage.getResource());
        await myScreenshot(page, screenshotPath(
            config.evidence.baseDirectory,
            config.sut.version,
            browserName,
            e7,
            "05-redireccion"
        ));
        // vuelve a visitar la página de miembros para recargar
        await membersPage.waitTime(5000);
        await membersPage.navigateTo()
        await myScreenshot(page, screenshotPath(
            config.evidence.baseDirectory,
            config.sut.version,
            browserName,
            e7,
            "06-miembros-recarga"
        ));

        // AND miembro no se puede hallar
        const deletedMember = await membersPage.findMember(mockEmail);
        expect(deletedMember).toBeNull();
    });
});