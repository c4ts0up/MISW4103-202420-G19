/**
 * ### Funcionalidad 6: Programar una publicación
 *
 * La funcionalidad de programar una publicación permite a los usuarios definir una fecha y hora específicos para que
 * un artículo se publique automáticamente en el sitio. Esto es ideal para planificar contenido con anticipación,
 * lo que permite mantener un flujo constante de publicaciones sin la necesidad de estar presente en el momento exacto
 * de la publicación.
 *
 * [Link de Wiki](https://github.com/c4ts0up/MISW4103-202420-G26/wiki/Listado-de-Funcionalidades#funcionalidad-6-programar-una-publicaci%C3%B3n)
 */

import {config} from "./config/config";
import EditorPage from "./pages/editorPage";
import ScheduledPage from "./pages/scheduledPage";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";
import {test} from "./fixtures/dataGenerator";
import logger from "./utils/logger";
import {DATE_GENERATION_OPTIONS, TIME_GENERATION_OPTIONS} from "./data/postProvider";

test.describe('F6', async () => {

    /**
     * ### E1: Programar una publicación con fecha válida
     *
     * GIVEN estoy loggeado como administrador
     * AND la publicación tiene título y cuerpo
     * WHEN programo la publicación
     * AND ingreso una fecha válida de publicación
     * AND confirmo la programación de la publicación
     * THEN la publicación se debería programar correctamente
     * AND la publicación debería aparecer en la lista de publicaciones programadas
     */
    const e1 = 'E001-programar-valido-publicacion'
    test(e1, async ( { page, browserName, dataProvider } ) => {
        const editorPage = new EditorPage(page, config.editorPage.resource);
        const scheduledPage = new ScheduledPage(page, config.scheduledPage.resource);

        const title = dataProvider.postProvider.getValidTitle();
        const content = dataProvider.postProvider.getValidContent();
        const date = dataProvider.postProvider.getValidDate();
        const time = dataProvider.postProvider.getValidTime();

        logger.info(`title = ${title}`);
        logger.info(`content = ${content}`);
        logger.info(`date = ${date}`);
        logger.info(`time = ${time}`);

        // GIVEN estoy loggeado como administrador
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "01-login"
            )
        );

        // AND la publicación tiene título y cuerpo
        await editorPage.navigateTo();
        await editorPage.createPost(title, content);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "02-post-filled"
            )
        );

        // WHEN programo la publicacion
        await editorPage.publishPost();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "03-new-post-created"
            )
        );

        await editorPage.changePostReleaseDate();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "04-publish-setting-button-clicked"
            )
        );

        // AND ingreso una fecha válida de publicación
        await editorPage.fillScheduleData(date, time);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "05-date-time-filled"
            )
        );

        // AND confirmo la programación de la publicación
        await editorPage.confirmSchedulePost();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "06-continue-button-clicked"
            )
        );
        await editorPage.publishScheduledPost();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "07-confirmed-scheduling"
            )
        );

        // THEN la publicación se debería programar correctamente
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "08-post-scheduled"
            )
        );
        // AND la publicación debería aparecer en la lista de publicaciones programadas
        await scheduledPage.reviewScheduledPosts();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e1,
                "09-no-error-message"
            )
        );
    });

    /**
     * ### E2: Programar una publicación con fecha inválida
     *
     * GIVEN estoy loggeado como administrador
     * AND la publicación tiene título y cuerpo
     * WHEN programo la publicación
     * AND ingreso una fecha inválida de publicación
     * AND confirmo la programación de la publicación
     * THEN debería recibir un mensaje de error por fecha inválida
     */
    // FIXME: la interfaz automáticamente modifica fechas inválidas. Si se desea replicar el mensaje de fallo, utilizar la hora actual
    const e2 = 'E002-programar-publicacion-invalida'
    test(e2, async ( {page, browserName, dataProvider }) => {
        test.slow();
        const editorPage = new EditorPage(page, config.editorPage.resource);
        const scheduledPage = new ScheduledPage(page, config.scheduledPage.resource);

        const title = dataProvider.postProvider.getValidTitle();
        const content = dataProvider.postProvider.getValidContent();
        // TODO: dateInvalid x timeInvalid = 4 casos. Mismo día, horas pasadas; distinto día, horas futuras, etc.
        const dateInvalid = dataProvider.postProvider.getInvalidDate(DATE_GENERATION_OPTIONS.PAST);
        const timeInvalid = dataProvider.postProvider.getInvalidTime(TIME_GENERATION_OPTIONS.OVERFLOW);

        logger.info(`title = ${title}`);
        logger.info(`content = ${content}`);
        logger.info(`dateInvalid = ${dateInvalid}`);
        logger.info(`timeInvalid = ${timeInvalid}`);

        // GIVEN estoy loggeado como administrador
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "01-login"
            )
        );

        // AND la publicación tiene título y cuerpo
        await editorPage.navigateTo();
        await editorPage.createPost(title, content);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "02-post-filled"
            )
        );

        // WHEN programo la publicacion
        await editorPage.publishPost();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "03-new-post-created"
            )
        );

        await editorPage.changePostReleaseDate();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "04-publish-setting-button-clicked"
            )
        );

        // AND ingreso una fecha inválida de publicación
        // FIXME: no se borra la opción de la hora
        await editorPage.fillScheduleData(dateInvalid, timeInvalid);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "05-date-time-filled"
            )
        );

        // AND confirmo la programación de la publicación
        await editorPage.confirmSchedulePost();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "06-continue-button-clicked"
            )
        );
        await editorPage.publishScheduledPost();
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "07-confirmed-scheduling"
            )
        );

        // THEN debería recibir un mensaje de error por fecha inválida
        await editorPage.validateInvalidSchedulePost(dateInvalid, timeInvalid);
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "08-invalid-date-alert"
            )
        );
    });
});