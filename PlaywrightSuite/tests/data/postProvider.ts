import {faker} from "@faker-js/faker";

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
        return faker.lorem.sentences({min: 1, max: 2});
    }
    getValidContent(): string {
        return faker.lorem.paragraphs({min: 1, max: 5});
    }
    getValidDate(): string {
        const futureDate = faker.date.future({years: 1});

        const month = futureDate.getMonth();
        const date = futureDate.getDate();

        let monthString = "", dateString = "";

        // arreglo del formato de mes
        if (month < 10) monthString += "0";
        monthString += month.toString();

        // arreglo del formato de día
        if (date < 10) dateString += "0";
        dateString += date.toString();

        return `${futureDate.getFullYear()}-${monthString}-${dateString}`;
    }
    getValidTime(): string {
        const futureDate = faker.date.future({years: 1});

        const hours = futureDate.getHours();
        const minutes = futureDate.getMinutes();

        let hoursString = "", minutesString = "";

        // arreglo del formato de horas
        if (hours < 10) hoursString += "0";
        hoursString += hours.toString();

        // arreglo del formato de minutos
        if (minutes < 10) minutesString += "0";
        minutesString += minutes.toString();

        return `${hoursString}:${minutesString}`;
    }
    getInvalidDate(option: DATE_GENERATION_OPTIONS): string {
        let year: number, month: number, date: number;

        if (option == DATE_GENERATION_OPTIONS.PAST) {
            const pastDate = faker.date.past({years: 1});
            year = pastDate.getFullYear();
            month = pastDate.getMonth();
            date = pastDate.getDate();
        }
        else if (option == DATE_GENERATION_OPTIONS.OVERFLOW) {
            const futureDate = faker.date.future({years: 1});
            year = futureDate.getFullYear();
            month = faker.number.int({min: 13, max: 16});
            date = futureDate.getDate();
        }
        else {
            year = 2023;
            month = 2;
            date = 29;
        }

        let yearString = `${year}`, monthString = "", dateString = "";

        // año no requiere arreglo

        // month fix
        if (month < 10) monthString += "0";
        monthString += month.toString();

        // date fix
        if (date < 10) dateString += "0";
        dateString += date.toString();

        return `${yearString}-${monthString}-${dateString}`
    }
    getInvalidTime(option: TIME_GENERATION_OPTIONS): string {
        let hours: number, minutes: number;

        if (option == TIME_GENERATION_OPTIONS.PAST) {
            const now = new Date();
            hours = faker.number.int({min: 0, max: now.getHours()});

            if (hours == now.getHours()) {
                minutes = faker.number.int({min: 0, max: now.getMinutes()-1});
            } else {
                minutes = faker.number.int({min: 0, max: 59});
            }
        }
        else {
            hours = faker.number.int({min: 25, max: 28});
            minutes = faker.number.int({min: 0, max: 59});
        }

        let hoursString = "", minutesString = "";
        // ajusta las horas
        if (hours < 10) hoursString += "0";
        hoursString += hours.toString();

        // ajusta los minutos
        if (minutes < 10) minutesString += "0";
        minutesString += minutes.toString();

        return `${hoursString}:${minutesString}`;
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
