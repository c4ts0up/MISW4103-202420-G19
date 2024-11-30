import {faker} from "@faker-js/faker";
import * as CountryLanguage from "@ladjs/country-language";
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

    /**
     * Zona horaria válida
     */
    getValidTimezone(): string;

    /**
     * Zona horaria inválida
     *
     */
    getInvalidTimezone(): string;
}


/**
 * Obtiene los datos de manera completamente aleatoria y sin relación
 */
export class SettingsRandomProvider implements SettingsProvider {
    getValidTimezone(): string {
        throw new Error("Method not implemented.");
    }
    getInvalidTimezone(): string {
        throw new Error("Method not implemented.");
    }
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
    getValidTimezone(): string {
        throw new Error("Method not implemented.");
    }
    getInvalidTimezone(): string {
        throw new Error("Method not implemented.");
    }

    getValidLanguage(): string {
        const codes = [
            'en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja'
        ];
        return faker.helpers.arrayElement(codes);
    }

    getInvalidLanguage(option: LANGUAGE_GENERATION_OPTIONS): string {
        if (option === LANGUAGE_GENERATION_OPTIONS.LONG) {
            return faker.lorem.words(4096).replace(/\s+/g, '').substring(0, 4096);
        } else if (option === LANGUAGE_GENERATION_OPTIONS.SHORT) {
            return "";
        }

        return "invalid-lang";
    }
}



/**
 * Obtiene los datos almacenados para las pruebas
 */
export class SettingsAPrioriProvider implements SettingsProvider {
    getValidTimezone(): string {
        throw new Error("Method not implemented.");
    }
    getInvalidTimezone(): string {
        throw new Error("Method not implemented.");
    }

    private static readonly VALID_LANGUAGES = [
        'en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja'
    ];

    private static readonly INVALID_SHORT_LANGUAGES = [
        'xx', 'yz', 'zz', 'ab', 'cd', 'ef', 'gh', 'ij', 'kl', 'mn', 'op', 'qr', 'st', 'uv', 'wx', 'yy'
    ];

    private static readonly INVALID_LONG_LANGUAGE = "a".repeat(4096);

    private static getRandomOption(options: string[]): string {
        return faker.helpers.arrayElement(options);
    }

    getValidLanguage(): string {
        return SettingsAPrioriProvider.getRandomOption(SettingsAPrioriProvider.VALID_LANGUAGES);
    }

    getInvalidLanguage(option: LANGUAGE_GENERATION_OPTIONS): string {
        switch (option) {
            case LANGUAGE_GENERATION_OPTIONS.LONG:
                return SettingsAPrioriProvider.INVALID_LONG_LANGUAGE;
            case LANGUAGE_GENERATION_OPTIONS.SHORT:
                return SettingsAPrioriProvider.getRandomOption(SettingsAPrioriProvider.INVALID_SHORT_LANGUAGES);
            default:
                return this.getValidLanguage();
        }
    }
}
