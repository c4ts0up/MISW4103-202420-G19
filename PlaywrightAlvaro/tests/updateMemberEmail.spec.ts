/**
 * Funcionalidad 5: Modificar el correo electrónico de un suscriptor
 * El usuario administrador del servidor Ghost puede modificar el correo electrónico de un usuario suscriptor de su
 * servicio Ghost para actualizar la información personal del usuario.
 */

// FIXME: flaky. Not waiting correctly to load members

import { test, expect } from '@playwright/test';
import { chromium } from '@playwright/test';
import LoginPage from "./pages/loginPage";
import MembersPage from "./pages/membersPage";
import {mockMembers} from "./data/mockMembers";
import {adminData} from "./data/admin";
import {config} from "./config/config";
import { faker } from '@faker-js/faker';

test.describe('F5', async () => {

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
     * E9: Cambiar el correo de un miembro por un correo válido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la pagina de miembros
     * AND hay un miembro creado
     * WHEN selecciono un miembro
     * AND cambio el correo por un correo valido
     * AND guardo la edicion del miembro
     * THEN se deberia guardar el nuevo correo
     * AND se debería mostrar el mensaje "Saved"
     */
    test('correo válido', async ({}) => {
        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockValidEmail = faker.internet.email();

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
            mockName,
            mockEmail
        );
        await membersPage.navigateTo();

        // WHEN selecciono un miembro
        await membersPage.editMember(mockEmail);

        // AND cambio el correo por un correo válido
        await membersPage.inputEmail(mockValidEmail);

        // AND guardo la edición del miembro
        await membersPage.saveMemberChanges();

        // THEN se debería guardar el nuevo correo
        // AND se debería mostrar el mensaje "Saved"
        await membersPage.validateChanges({
            saveButtonResponse: "Save"
        });
    });


    /**
     * E10: Cambiar el correo de un miembro por un correo inválido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro creado
     * WHEN selecciono un miembro
     * AND cambio el correo por un correo inválido
     * AND guardo la edición del miembro
     * THEN se debería guardar el nuevo correo
     * AND se debería mostrar el mensaje "Retry"
     */
    test('correo inválido', async ({}) => {
        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockInvalidEmail = faker.word.noun();

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
            mockName,
            mockEmail
        );

        // WHEN selecciono un miembro
        await membersPage.editMember(mockEmail);

        // AND cambio el correo por un correo inválido
        await membersPage.inputEmail(mockInvalidEmail);

        // AND guardo la edición del miembro
        await membersPage.saveMemberChanges();

        // THEN se debería guardar el nuevo correo
        // AND se debería mostrar el mensaje "Saved"
        await membersPage.validateChanges({
            saveButtonResponse: "Retry",
            emailResponse: "Invalid Email."
        });
    });
});




