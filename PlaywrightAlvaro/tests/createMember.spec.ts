/**
 * ### Funcionalidad: 7: Agregar un miembro a la página
 *
 * La funcionalidad de agregar un miembro a la página permite a los administradores incluir nuevos usuarios en su sitio
 * de Ghost como suscriptores. Esto significa que los usuarios pueden registrarse para recibir actualizaciones,
 * newsletters y acceso a contenido exclusivo, sin necesariamente tener permisos de edición o colaboración en el sitio.
 *
 * [Link de Wiki](https://github.com/c4ts0up/MISW4103-202420-G26/wiki/Listado-de-Funcionalidades#funcionalidad-7-agregar-un-miembro-a-la-p%C3%A1gina)
 *
 */

import {test} from "@playwright/test";

test.describe('F7', async () => {

    /**
     * ### E3: Crear un nuevo miembro con un correo válido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de creación de miembros
     * WHEN creo un nuevo miembro
     * AND agrego datos válidos
     * AND cambio el correo por un correo válido
     * AND guardo el nuevo miembro
     * THEN el nuevo miembro debería aparecer en la lista de miembros
     */
    const e3 = 'E003-create-valid-member';
    test(e3, async ( { page, browserName } ) => {

        // GIVEN estoy loggeado como administrador
    });


    /**
     * ### E4: Crear un nuevo miembro con un correo inválido
     *
     * GIVEN estoy loggeado como administrador
     * AND estoy en la página de creación de miembros
     * WHEN creo un nuevo miembro
     * AND agrego datos válidos
     * AND cambio el correo por un correo inválido
     * AND guardo el nuevo miembro
     * AND cambio el correo por un correo válido
     * AND guardo el nuevo miembro
     * THEN el borde rojo del campo de correo debería desaparecer
     * AND el nuevo miembro debería aparecer en la lista de miembros
     */
    const e4 = 'E004-create-invalid-member';
    test(e4, async ( { page, browserName } ) => {

        // GIVEN estoy loggeado como administrador
    });
});