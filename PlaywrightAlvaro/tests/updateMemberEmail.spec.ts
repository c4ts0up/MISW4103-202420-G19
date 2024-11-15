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
    test('correo válido', async ( { page } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockValidEmail = faker.internet.email();

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

        // AND cambio el correo por un correo válido
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            selectedMember,
            mockName,
            mockValidEmail
        );

        // THEN se debería guardar el nuevo correo
        // AND se debería mostrar el mensaje "Saved"
        expect(saveButtonResponse.trim()).toEqual('Saved');
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
    test('correo inválido', async ( { page } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockInvalidEmail = faker.word.noun();

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

        // AND cambio el correo por un correo inválido
        // AND guardo la edición del miembro
        const saveButtonResponse = await membersPage.editMember(
            selectedMember,
            mockName,
            mockInvalidEmail
        );

        // THEN no se debería guardar
        // AND se debería mostrar el mensaje "Retry"
        expect(saveButtonResponse.trim()).toEqual('Retry');
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
    test('correo repetido', async ( { page } ) => {
        let membersPage = new MembersPage(page, config.membersPage.resource);

        const mockName = faker.person.fullName();
        const mockEmail = faker.internet.email();
        const mockInvalidEmail = faker.word.noun();

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de miembros
        await membersPage.navigateTo();

        // AND hay un miembro creado
        await membersPage.createMember(
            mockName,
            mockEmail
        );

        // WHEN creo un miembro
        // AND cambio el correo por un correo existente
        // AND guardo la edicion del miembro
        const saveButtonResponse = await membersPage.createMember(
            mockName,
            mockEmail
        )

        // THEN no se debería guardar
        // AND se debería mostrar el mensaje "Retry"
        expect(saveButtonResponse.trim()).toEqual('Retry')
    });
});




