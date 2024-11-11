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

test.describe('F3', async () => {

    let browser;
    let context;
    let basePage;
    let loginPage;
    let membersPage;

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
        context = await browser.newContext();
        basePage = await context.newPage();

        loginPage = new LoginPage(basePage, config.loginPage.url);
        membersPage = new MembersPage(basePage, config.membersPage.url);
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /**
     * E8
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro creado
     * WHEN selecciono un miembro
     * AND borro el miembro
     * THEN redirige a la pagina principal
     * AND miembro no se puede hallar
     */
    test('delete member', async({}) => {
        // GIVEN estoy loggeado como administrador
        await loginPage.navigateTo();
        await loginPage.login(
            adminData.username,
            adminData.password
        );

        // AND estoy en la página de miembros
        await membersPage.navigateTo();

        // AND hay un miembro creado
        await membersPage.createMemberIfMissing(
            mockMembers.name,
            mockMembers.email
        );

        // WHEN selecciono un miembro
        await membersPage.editMember(mockMembers.name);

        // AND borro el miembro
        await membersPage.deleteMember();

        // THEN redirigie a la pagina principal
        expect(membersPage.redirectedToHome())

        // AND miembro no se puede hallar
        const member = await membersPage.findMember();
        expect(member).toBeNull();
    });

});