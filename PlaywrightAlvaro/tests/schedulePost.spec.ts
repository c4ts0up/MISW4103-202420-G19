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

import {test} from "@playwright/test";
import {config} from "./config/config";
import EditorPage from "./pages/editorPage";
import ScheduledPage from "./pages/scheduledPage";
import {post_content_pe1, post_content_pe2} from "./data/blog";
import {myScreenshot} from "./utils/evidence";
import {screenshotPath} from "./utils/pathCreator";

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
    test(e1, async ( { page, browserName } ) => {
        const editorPage = new EditorPage(page, config.editorPage.resource);
        const scheduledPage = new ScheduledPage(page, config.scheduledPage.resource);

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
        await editorPage.createPost(
            post_content_pe1.title,
            post_content_pe1.content
        );
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
        await editorPage.fillScheduleData(
            post_content_pe1.date,
            post_content_pe1.time
        );
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
        await editorPage.publishScheduledPost()
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
        await scheduledPage.reviewScheduledPosts()
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
    const e2 = 'E002-programar-invalido-publicacion'
    test(e2, async ( {page, browserName }) => {
        const editorPage = new EditorPage(page, config.editorPage.resource);
        const scheduledPage = new ScheduledPage(page, config.scheduledPage.resource);

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
        await editorPage.createPost(
            post_content_pe2.title,
            post_content_pe2.content
        );
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
        await editorPage.fillScheduleData(
            post_content_pe2.date,
            post_content_pe2.time
        );
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

        // THEN debería recibir un mensaje de error por fecha inválida
        await editorPage.validateInvalidSchedulePost(
            post_content_pe2.date,
            post_content_pe2.time
        )
        await myScreenshot(page, screenshotPath(
                config.evidence.baseDirectory,
                config.sut.version,
                browserName,
                e2,
                "07-invalid-date-alert"
            )
        );
    });
});