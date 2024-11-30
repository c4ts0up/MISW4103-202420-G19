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
        const time = faker.number.int({ min: 0, max: 12 });
        const sign = faker.helpers.arrayElement(['-', '+']);

        // no hay signo
        if (time == 0) return '(GMT +0:00)';
        return `(GMT ${sign}${time}:00`;
    }
    getInvalidTimezone(): string {
        const time = faker.number.int({ min: 15, max: 30 });
        const sign = faker.helpers.arrayElement(['-', '+', '']);

        return `(GMT ${sign}${time}:00`;
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

    private VALID_OPTIONS: [string, string][] = [
        ['en', '(GMT -10:00) Hawaii'],
        ['es', '(GMT -5:00) Bogota, Lima, Quito'],
        ['fr', '(GMT +1:00) Brussels, Copenhagen, Madrid, Paris'],
        ['de', '(GMT +1:00) Amsterdam, Berlin, Rome, Stockholm, Vienna'],
        ['ru', '(GMT +3:00) Moscow, St. Petersburg, Volgograd'],
        ['ja', '(GMT +9:00) Osaka, Sapporo, Tokyo'],
        ['ne', '(GMT +5:45) Katmandu']
    ];

    private INVALID_OPTIONS: [string, string][] = [
        ['xx', '(GMT -11:00) Bogota'],
        ['ij', '(GMT 4:00) Baku, Tbilisi, Yerevan'],
        ['yy', '(GMT +30:00) Kiribati']
    ]

    getValidTimezone(): string {
        return faker.helpers.arrayElement(this.VALID_OPTIONS[1]);
    }
    getInvalidTimezone(): string {
        return faker.helpers.arrayElement(this.INVALID_OPTIONS[1]);
    }

    getValidLanguage(): string {
        return faker.helpers.arrayElement(this.VALID_OPTIONS[0]);
    }

    getInvalidLanguage(option: LANGUAGE_GENERATION_OPTIONS): string {
        if (option === LANGUAGE_GENERATION_OPTIONS.LONG) {
            return faker.lorem.words(4096).replace(/\s+/g, '').substring(0, 4096);
        } else if (option === LANGUAGE_GENERATION_OPTIONS.SHORT) {
            return "";
        }


        return faker.helpers.arrayElement(this.INVALID_OPTIONS[0]);
    }
}



/**
 * Obtiene los datos almacenados para las pruebas
 */
export class SettingsAPrioriProvider implements SettingsProvider {

    private static readonly VALID_LANGUAGES = [
        'en', 'es', 'fr', 'de', 'it', 'pt', 'nl', 'pl', 'ru', 'ja'
    ];

    private static readonly INVALID_SHORT_LANGUAGES = [
        'xx', 'yz', 'zz', 'ab', 'cd', 'ef', 'gh', 'ij', 'kl', 'mn', 'op', 'qr', 'st', 'uv', 'wx', 'yy'
    ];

    private static readonly VALID_TIMEZONES = [
        '(GMT -10:00) Hawaii',
        '(GMT +12:00) International Date Line West',
        '(GMT +9:30) Darwin', '(GMT) UTC' ,
        '(GMT +5:45) Katmandu',
        '(GMT -5:00) Bogota, Lima, Quito'
    ];

    private static readonly INVALID_TIMEZONES = [
        '(GMT -11:00) Bogota', '(GMT 4:00) Baku, Tbilisi, Yerevan'
    ];

    private static readonly INVALID_LONG_LANGUAGE = "a".repeat(4096);

    private static getRandomOption(options: string[]): string {
        return faker.helpers.arrayElement(options);
    }

    getValidTimezone(): string {
        return SettingsAPrioriProvider.getRandomOption(SettingsAPrioriProvider.VALID_TIMEZONES);
    }
    getInvalidTimezone(): string {
        return SettingsAPrioriProvider.getRandomOption(SettingsAPrioriProvider.INVALID_TIMEZONES);
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
