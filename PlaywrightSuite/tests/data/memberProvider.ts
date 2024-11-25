import {faker} from "@faker-js/faker";
import RandExp = require("randexp");

export enum NAME_GENERATION_OPTIONS {
    LONG = `^[A-Z][a-z]{91} [A-Z][a-z]{100}$`,
    SHORT = `^$`
}

export enum EMAIL_GENERATION_OPTIONS {
    LONG = `^[a-zA-Z0-9]{186}@[a-zA-Z]\\.[a-zA-Z]{3}$`,
    SHORT = `^$`,
    NO_AT = `^[a-zA-Z0-9]{3,50}(\\.[a-zA-Z]{2,3}){1,5}$`,
    NO_DOMAIN = `^[a-zA-Z0-9]{3,50}@[a-zA-Z]{3,10}$`,
    SPECIAL_CHARACTERS = `^[\x00-\x7F]{3,20}@[a-zA-Z]{3,20}\\.[a-zA-Z]{2,3}$`
}


/**
 * Proveedor de datos para un miembro
 */
export interface MemberProvider {

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
export class MemberRandomProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        return new RandExp(option).gen();
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        return new RandExp(option).gen();
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
export class MemberRelatedProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }

    getValidEmail(): string {
        throw new Error("Method not implemented.");
    }

    getValidName(): string {
        throw new Error("Method not implemented.");
    }
}


/**
 * Obtiene los datos almacenados para las pruebas
 */
export class MemberAPrioriProvider implements MemberProvider {

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }

    getValidEmail(): string {
        throw new Error("Method not implemented.");
    }

    getValidName(): string {
        throw new Error("Method not implemented.");
    }
}
