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

    test.beforeAll(async () => {
        browser = await chromium.launch({ headless: false });
    });

    test.afterAll(async () => {
        await browser.close();
    });

    /**
     * E8: Cambiar el correo de un miembro por un correo válido
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
        let browser = await chromium.launch({ headless: false });
        let context = await browser.newContext();
        let basePage = await context.newPage();

        let membersPage = new MembersPage(basePage, config.membersPage.url);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockValidEmail = faker.internet.email();

        // GIVEN estoy loggeado como administrador

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

        await browser.close();
    });


    /**
     * E9: Cambiar el correo de un miembro por un correo inválido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro creado
     * WHEN selecciono un miembro
     * AND cambio el correo por un correo inválido
     * AND guardo la edición del miembro
     * THEN no se debería guardar
     * AND se debería mostrar el mensaje "Retry"
     */
    test('correo inválido', async ({}) => {
        let context = await browser.newContext();
        let basePage = await context.newPage();

        let membersPage = new MembersPage(basePage, config.membersPage.url);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockInvalidEmail = faker.word.noun();

        // GIVEN estoy loggeado como administrador

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

        // THEN no se debería guardar
        // AND se debería mostrar el mensaje "Retry"
        await membersPage.validateChanges({
            saveButtonResponse: "Retry",
            emailResponse: "Invalid Email."
        });

        await context.close();
    });


    /**
     * E10: Correo repetido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de miembros
     * AND hay un miembro creado
     * WHEN creo un miembro
     * AND cambio el correo por un correo existente
     * AND guardo la edición del miembro
     * THEN se debería guardar el nuevo correo
     * AND se debería mostrar el mensaje "Member already exists. Attempting to add member with existing email address"
     */
    test('correo repetido', async ({}) => {
        let context = await browser.newContext();
        let basePage = await context.newPage();

        let membersPage = new MembersPage(basePage, config.membersPage.url);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockInvalidEmail = faker.word.noun();

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de miembros
        await membersPage.navigateTo();

        // AND hay un miembro creado
        await membersPage.createMemberIfMissing(
            mockName,
            mockEmail
        );

        // WHEN creo un miembro
        // AND cambio el correo por un correo existente
        await membersPage.baseCreateMember(
            mockName,
            mockEmail
        )

        // AND guardo la edición del miembro
        await membersPage.saveMemberChanges();

        // THEN no se debería guardar
        // AND se debería mostrar el mensaje "Retry"
        await membersPage.validateChanges({
            saveButtonResponse: "Retry",
            emailResponse: "Member already exists. Attempting to add member with existing email address"
        });

        await context.close();
    });
});




