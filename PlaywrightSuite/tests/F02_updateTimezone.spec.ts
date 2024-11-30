/**
 * Funcionalidad 2: Actualizar zona horaria
 * El usuario administrador del servicio Ghost puede actualizar
 * su zona horaria para fijar una hora y fecha a todas las publicaciones.
 */

import {test} from "./fixtures/dataGenerator";
import SettingsPage, {SubSettingsSelectors} from "./pages/settingsPage";
import {config} from "./config/config";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";

test.describe('F2', async () => {

    /**
     * E030: Cambiar la zona horaria por una zona horaria válida
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de configuraciones generales
     * WHEN edito la opción de zona horaria
     * AND selecciono una zona horaria valida
     * AND guardo la nueva zona horaria
     * THEN se debería guardar la nueva zona horaria
     */
    const e30 = 'E030-zona-horaria-inválida';
    test(e30, async ( { page, browserName, dataProvider } ) => {
        const settingsPage = new SettingsPage(page, config.settingsPage.resource);

        const timezone = dataProvider.settingsProvider.getValidTimezone();

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de configuraciones generales
        await settingsPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e30,
                "01-settings-page"
            )
        );

        // WHEN edito la opción de zona horaria
        await settingsPage.navigateToSubSetting(SubSettingsSelectors.TIMEZONE);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e30,
                "02-timezone-sub-menu"
            )
        );
    });

    /**
     * E031: Cambiar la zona horaria por una zona horaria inválida
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de configuraciones generales
     * WHEN edito la opción de zona horaria
     * AND selecciono una zona horaria inválida
     * AND guardo la nueva zona horaria
     * THEN se muestra un error de zona horaria inválida
     */
    const e31 = 'E031-zona-horaria-invalida';
    test(e31, async( { page, browserName, dataProvider } ) => {
        const settingsPage = new SettingsPage(page, config.settingsPage.resource);

        const timezone = dataProvider.settingsProvider.getInvalidTimezone();

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de configuraciones generales
        await settingsPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e31,
                "01-settings-page"
            )
        );

        // WHEN edito la opción de zona horaria
        await settingsPage.navigateToSubSetting(SubSettingsSelectors.TIMEZONE);
        await settingsPage.clickEditButton(SubSettingsSelectors.TIMEZONE);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e31,
                "02-timezone-sub-menu"
            )
        );

        // AND selecciono una zona horaria inválida

    });
});