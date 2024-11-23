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

import {expect, test} from "@playwright/test";

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

    });
});