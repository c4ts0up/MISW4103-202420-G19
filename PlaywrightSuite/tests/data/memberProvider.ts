/**
 * Proveedor de datos para un miembro
 */
interface MemberProvider {

    /**
     * Nombre válido de un miembro
     */
    getValidName(): string

    /**
     * Nombre inválido de un miembro
     */
    getInvalidName(): string

    /**
     * Email válido de un miembro
     */
    getValidEmail(): string

    /**
     * Email inválido de un miembro
     */
    getInvalidEmail(): string
}


/**
 * Obtiene los datos de manera completamente aleatoria y sin relación
 */
class MemberRandomProvider implements MemberProvider {

    getInvalidEmail(): string {
        return "";
    }

    getInvalidName(): string {
        return "";
    }

    getValidEmail(): string {
        return "";
    }

    getValidName(): string {
        return "";
    }
}


/**
 * Obtiene los datos de manera pseudoaleatoria. Los datos tienen relación entre ellos
 */
class MemberRelatedProvider implements MemberProvider {

    getInvalidEmail(): string {
        return "";
    }

    getInvalidName(): string {
        return "";
    }

    getValidEmail(): string {
        return "";
    }

    getValidName(): string {
        return "";
    }
}


/**
 * Obtiene los datos almacenados para las pruebas
 */
class MemberAPrioriProvider implements MemberProvider {

    getInvalidEmail(): string {
        return "";
    }

    getInvalidName(): string {
        return "";
    }

    getValidEmail(): string {
        return "";
    }

    getValidName(): string {
        return "";
    }
}