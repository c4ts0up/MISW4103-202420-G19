import {faker} from "@faker-js/faker";
import CountryLanguage = require("@ladjs/country-language");
import RandExp = require("randexp");

export enum DATE_GENERATION_OPTIONS {
    PAST,
    OVERFLOW,
    LEAP_YEAR
}

export enum TIME_GENERATION_OPTIONS {
    PAST,
    OVERFLOW
}


/**
 * Proveedor de datos para un
 */
export interface PostProvider {

    /**
     * Retorna un título válido de un post
     */
    getValidTitle(): string

    /**
     * Retorna contenido válido de un post
     */
    getValidContent(): string

    /**
     * Retorna una fecha válida en formato AAAA-MM-DD
     */
    getValidDate(): string

    /**
     * Retorna una hora válida en formato HH:MM
     */
    getValidTime(): string

    /**
     * Retorna una fecha inválida (posiblemente en formato AAAA-MM-DD)
     * @param option característica única de invalidez de la fecha
     */
    getInvalidDate(option: DATE_GENERATION_OPTIONS): string

    /**
     * Retorna una hora inválida (posiblemente ene formato HH:MM)
     * @param option característica única de invalidez de la hora
     */
    getInvalidTime(option: TIME_GENERATION_OPTIONS): string
}


/**
 * Obtiene los datos de manera completamente aleatoria y sin relación
 */
export class PostRandomProvider implements PostProvider {
    getValidTitle(): string {
        throw new Error("Method not implemented.");
    }
    getValidContent(): string {
        throw new Error("Method not implemented.");
    }
    getValidDate(): string {
        throw new Error("Method not implemented.");
    }
    getValidTime(): string {
        throw new Error("Method not implemented.");
    }
    getInvalidDate(option: DATE_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }
    getInvalidTime(option: TIME_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }


}


/**
 * Obtiene los datos de manera pseudoaleatoria. Los datos tienen relación entre ellos
 */
export class PostRelatedProvider implements PostProvider {
    getValidTitle(): string {
        throw new Error("Method not implemented.");
    }
    getValidContent(): string {
        throw new Error("Method not implemented.");
    }
    getValidDate(): string {
        throw new Error("Method not implemented.");
    }
    getValidTime(): string {
        throw new Error("Method not implemented.");
    }
    getInvalidDate(option: DATE_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }
    getInvalidTime(option: TIME_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }

}


/**
 * Obtiene los datos almacenados para las pruebas
 */
export class PostAPrioriProvider implements PostProvider {
    getValidTitle(): string {
        throw new Error("Method not implemented.");
    }
    getValidContent(): string {
        throw new Error("Method not implemented.");
    }
    getValidDate(): string {
        throw new Error("Method not implemented.");
    }
    getValidTime(): string {
        throw new Error("Method not implemented.");
    }
    getInvalidDate(option: DATE_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }
    getInvalidTime(option: TIME_GENERATION_OPTIONS): string {
        throw new Error("Method not implemented.");
    }

}
