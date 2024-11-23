/**
 * ### Funcionalidad 8: Configurar el idioma de las publicaciones
 *
 * La funcionalidad de configurar el idioma en Ghost permite a los administradores establecer la lengua principal que
 * se utilizará en su sitio web. Esta opción es fundamental para optimizar la experiencia del usuario, pues se puede
 * filtrar por idioma y esto le permitirá al usuario acceder al contenido correctamente.
 *
 * [Link de Wiki](https://github.com/c4ts0up/MISW4103-202420-G26/wiki/Listado-de-Funcionalidades#funcionalidad-8-configurar-el-idioma-de-las-publicaciones)
 */

import {test} from "@playwright/test";
import SettingsPage, {SubSettingsSelectors} from "./pages/settingsPage";
import {config} from "./config/config";
import {language_content_pe6} from "./data/blog";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";

test.describe('F8', async () => {

    /**
     * E5: Cambiar configuración de idioma válido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de configuración
     * AND selecciono loa opción de idioma
     * WHEN edito el idioma de publicación
     * AND escribo el código del idioma válido
     * THEN el idioma debería guardarse correctamente
     */
    const e5 = 'E005-cambiar-lenguaje-valido';
    test(e5, async ( { page, browserName } ) => {
        test.slow();
        const settingsPage = new SettingsPage(page, config.settingsPage.resource);

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de configuración
        await settingsPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e5,
                "01-settings-page"
            )
        );
        // AND selecciono la opción de idioma
        await settingsPage.navigateToSubSetting(SubSettingsSelectors.LANGUAGE);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e5,
                "02-language-settings"
            )
        );

        // WHEN edito el idioma de publicación
        await settingsPage.clickEditButton();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e5,
                "03-edit-button-clicked"
            )
        );
        // AND escribo el código del idioma válido
        await settingsPage.changeLanguage(language_content_pe6.language);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e5,
                "04-language-input-filled"
            )
        );

        // THEN el idioma debería guardarse correctamente
        await settingsPage.confirmLanguageUpdate();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e5,
                "05-language-updated"
            )
        );
    });

    /**
     * E6: Cambiar configuración de idioma inválido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de configuración
     * AND selecciono la opción de idioma
     * WHEN edito el idioma de publicación
     * AND escribo el código del idioma inválido
     * THEN el idioma no debería guardarse
     */
    const e6 = 'E006-cambiar-lenguaje-invalido';
    test(e6, async ( { page, browserName } ) => {
        const settingsPage = new SettingsPage(page, config.settingsPage.resource);

        // GIVEN estoy loggeado como administrador

        // AND estoy en la página de configuración
        await settingsPage.navigateTo();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e6,
                "01-settings-page"
            )
        );
        // AND selecciono la opción de idioma
        await settingsPage.navigateToSubSetting(SubSettingsSelectors.LANGUAGE);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e6,
                "02-language-settings"
            )
        );

        // WHEN edito el idioma de publicación
        await settingsPage.clickEditButton();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e6,
                "03-edit-button-clicked"
            )
        );
        // AND escribo el código del idioma inválido
        await settingsPage.changeLanguage(language_content_pe6.language);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e6,
                "04-language-input-filled"
            )
        );

        // THEN el idioma no debería guardarse
        await settingsPage.failUpdateLanguage();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e6,
                "05-language-not-updated"
            )
        );
    });
});