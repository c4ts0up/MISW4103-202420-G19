/**
 * Funcionalidad 2: Actualizar zona horaria
 * El usuario administrador del servicio Ghost puede actualizar
 * su zona horaria para fijar una hora y fecha a todas las publicaciones.
 */

/**
 * E7: Cambiar la zona horaria por una zona horaria válida
 *
 * GIVEN estoy loggeado como administrador
 * AND estoy en la pagina de configuraciones generales
 * WHEN edito la opcion de zona horaria
 * AND selecciono una zona horaria valida
 * AND guardo la nueva zona horaria
 * THEN se deberia guardar la nueva zona horaria
 */


/**
 * E8: Cambiar la zona horaria por una zona horaria inválida
 *
 * GIVEN estoy loggeado como administrador
 * AND estoy en la pagina de configuraciones generales
 * WHEN edito la opcion de zona horaria
 * AND selecciono una zona horaria inválida
 * AND guardo la nueva zona horaria
 * THEN se muestra un error de zona horaria invalida
 */