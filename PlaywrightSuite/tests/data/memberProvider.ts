import {faker} from "@faker-js/faker";

enum NAME_GENERATION_OPTIONS {
    LONG,
    SHORT,
    SPECIAL_CHARACTERS
}

enum EMAIL_GENERATION_OPTIONS {
    LONG,
    SHORT,
    NO_AT,
    NO_DOMAIN,
    SPECIAL_CHARACTERS
}


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
     * @param option qué característica invalidará al nombre dado
     */
    getInvalidName(option: NAME_GENERATION_OPTIONS): string

    /**
     * Email válido de un miembro
     */
    getValidEmail(): string

    /**
     * Email inválido de un miembro
     * @param option qué característica invalidará al nombre dado
     */
    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string
}


/**
 * Obtiene los datos de manera completamente aleatoria y sin relación
 */
class MemberRandomProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        if (option == EMAIL_GENERATION_OPTIONS.LONG) {
            // aaa...a@b.xyz
            return `${faker.string.alphanumeric(186)}@${faker.string.alpha(1)}.${faker.string.alpha(3)}`;
        }
        else if (option == EMAIL_GENERATION_OPTIONS.SHORT) {
            return "";
        }
        else if (option == EMAIL_GENERATION_OPTIONS.NO_AT) {
            // abcdefgh.xyz
            return `${faker.string.alphanumeric()}.${faker.string.alpha(3)}`
        }
        else if (option == EMAIL_GENERATION_OPTIONS.NO_DOMAIN) {
            // abcdefgh@mail
            return `${faker.string.alphanumeric()}@${faker.string.alpha()}`
        }
        else {
            // ñññ...ñ@mail.xyz
            return `${faker.string.sample()}@${faker.string.alpha()}.${faker.string.sample(3)}`
        }
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        if (option == NAME_GENERATION_OPTIONS.LONG) {
            return `${faker.string.alpha(186)}@${faker.string.alpha(1)}.${faker.string.alpha(3)}`;
        }
        else if (option == NAME_GENERATION_OPTIONS.SHORT) {
            throw new Error(`No se puede generar un nombre inválido al ser corto`);
        }
        else {
            return `${faker.string.sample(186)}@${faker.string.sample(1)}.${faker.string.sample(3)}`
        }
    }

    getValidEmail(): string {
        return faker.internet.email();
    }

    getValidName(): string {
        return faker.person.fullName();
    }
}


/**
 * Obtiene los datos de manera pseudoaleatoria. Los datos tienen relación entre ellos
 */
class MemberRelatedProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        return "";
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
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

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        return "";
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        return "";
    }

    getValidEmail(): string {
        return "";
    }

    getValidName(): string {
        return "";
    }
}