/**
 * Funcionalidad 3: Eliminar un miembro de la página
 * El usuario administrador del servicio Ghost puede eliminar un usuario suscriptor de su servicio Ghost para que pierda
 * acceso a la cuenta de usuario suscrito y su funcionalidad correspondiente.
 */

import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';
import LoginPage from "./pages/loginPage";
import MembersPage from "./pages/membersPage";
import {mockMembers} from "./data/mockMembers";
import {adminData} from "./data/admin";
import {config} from "./config/config";
import {faker} from "@faker-js/faker";
import playwrightConfig from "../playwright.config";

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
    test('delete member', async( { page } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();

        // GIVEN estoy loggeado como administrador


        // AND estoy en la página de miembros
        await membersPage.navigateTo();

        // AND hay un miembro creado
        await membersPage.createMember(
            mockName,
            mockEmail
        );
        await membersPage.navigateTo();

        // WHEN selecciono un miembro
        const selectedMember = await membersPage.findMember(mockEmail)

        // AND borro el miembro
        await membersPage.deleteMember(
            selectedMember
        );

        // THEN redirige a la pagina principal
        await membersPage.checkRedirection(membersPage.getResource());
        // vuelve a visitar la página principal para recargar
        await membersPage.waitTime(5000);
        await membersPage.navigateTo()

        // AND miembro no se puede hallar
        const deletedMember = await membersPage.findMember(mockEmail);
        if (deletedMember === null) {
            console.log("Es null");
        }
        expect(deletedMember).toBeNull();
    });
});