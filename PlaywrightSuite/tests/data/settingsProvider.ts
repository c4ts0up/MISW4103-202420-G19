import {faker} from "@faker-js/faker";
import CountryLanguage = require("@ladjs/country-language");
import RandExp = require("randexp");

export enum LANGUAGE_GENERATION_OPTIONS {
    LONG = `^[a-z]{4096}$`,
    SHORT = `^$`,
}


/**
 * Proveedor de datos para un
 */
export interface SettingsProvider {

    /**
     * Lenguaje válido
     * Vagamente basado en [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
     */
    getValidLanguage(): string

    /**
     * Lenguaje inválido
     * Vagamente basado en [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
     * @param option qué característica invalidará al lenguaje dado
     */
    getInvalidLanguage(option: LANGUAGE_GENERATION_OPTIONS): string
}


/**
 * Obtiene los datos de manera completamente aleatoria y sin relación
 */
export class SettingsRandomProvider implements SettingsProvider {
    getInvalidLanguage(option: LANGUAGE_GENERATION_OPTIONS): string {
        return new RandExp(option).gen();
    }

    getValidLanguage(): string {
        const codes = [
            ...CountryLanguage.getLanguageCodes(1),
            ...CountryLanguage.getLanguageCodes(2),
            ...CountryLanguage.getLanguageCodes(3),
        ]

        return faker.helpers.arrayElement(codes);
    }

}


/**
 * Obtiene los datos de manera pseudoaleatoria. Los datos tienen relación entre ellos
 */
export class SettingsRelatedProvider implements SettingsProvider {

    getValidLanguage(): string {
        throw new Error("Method not implemented.");
    }

    getInvalidLanguage(option: LANGUAGE_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }
}


/**
 * Obtiene los datos almacenados para las pruebas
 */
export class SettingsAPrioriProvider implements SettingsProvider {

    getInvalidLanguage(option: LANGUAGE_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }

    getValidLanguage(): string {
        throw new Error("Method not implemented.");
    }
}
