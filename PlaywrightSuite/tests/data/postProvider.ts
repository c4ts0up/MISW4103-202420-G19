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

    private postTitle: string;
    private postContent: string;
    private postDate: Date;
    private postTime: string;

    constructor() {
        this.postTitle = faker.lorem.sentence();
        this.postContent = faker.lorem.paragraph();
        
        this.postDate = faker.date.future();
        const hours = this.postDate.getHours();
        const minutes = this.postDate.getMinutes();
        let hoursString = "", minutesString = "";

        if (hours < 10) hoursString += "0";
        hoursString += hours.toString();

        if (minutes < 10) minutesString += "0";
        minutesString += minutes.toString();

        this.postTime = `${hoursString}:${minutesString}`;
    }

    getValidTitle(): string {
        return this.postTitle;
    }

    getValidContent(): string {
        return this.postContent;
    }

    getValidDate(): string {
        const year = this.postDate.getFullYear();
        const month = this.postDate.getMonth() + 1;
        const day = this.postDate.getDate();

        let monthString = "", dayString = "";

        if (month < 10) monthString += "0";
        monthString += month.toString();

        if (day < 10) dayString += "0";
        dayString += day.toString();

        return `${year}-${monthString}-${dayString}`;
    }

    getValidTime(): string {
        return this.postTime;
    }

    getInvalidDate(option: DATE_GENERATION_OPTIONS): string {
        switch (option) {
            case DATE_GENERATION_OPTIONS.PAST:
                return faker.date.past().toISOString().split('T')[0];
            case DATE_GENERATION_OPTIONS.OVERFLOW:
                return `2024-13-01`;
            case DATE_GENERATION_OPTIONS.LEAP_YEAR:
                return `2023-02-29`;
            default:
                return this.getValidDate();
        }
    }

    getInvalidTime(option: TIME_GENERATION_OPTIONS): string {
        switch (option) {
            case TIME_GENERATION_OPTIONS.PAST:
                const now = new Date();
                let hours = faker.number.int({ min: 0, max: now.getHours() });
                let minutes = faker.number.int({ min: 0, max: now.getMinutes() - 1 });
                return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
            case TIME_GENERATION_OPTIONS.OVERFLOW:
                return `25:00`;
            default:
                return this.getValidTime();
        }
    }
}


/**
 * Obtiene los datos almacenados para las pruebas
 */
export class PostAPrioriProvider implements PostProvider {

    private static readonly VALID_TITLES = [
        "Post de prueba",
        "Post de ejemplo",
        "Artículo informativo",
        "Post sobre automatización"
    ];

    private static readonly VALID_CONTENTS = [
        "Este es el contenido de un post de prueba que se utilizará para las pruebas automatizadas.",
        "Contenido de ejemplo para la prueba automatizada.",
        "Este es un artículo sobre la automatización de procesos.",
        "Información relevante sobre la gestión de proyectos."
    ];

    private static readonly VALID_DATES = [
        "2024-12-01",
        "2025-06-15",
        "2024-11-30",
        "2025-08-30"
    ];

    private static readonly VALID_TIMES = [
        "14:30",
        "09:00",
        "18:45",
        "23:59"
    ];

    private static readonly INVALID_DATE_PAST = "2022-05-15";
    private static readonly INVALID_DATE_OVERFLOW = "2024-13-01";
    private static readonly INVALID_DATE_LEAP_YEAR = "2025-02-29";

    private static readonly INVALID_TIME_PAST = "02:00";
    private static readonly INVALID_TIME_OVERFLOW = "25:00";

    private static getRandomOption(options: string[]): string {
        return faker.helpers.arrayElement(options);
    }

    getValidTitle(): string {
        return PostAPrioriProvider.getRandomOption(PostAPrioriProvider.VALID_TITLES);
    }

    getValidContent(): string {
        return PostAPrioriProvider.getRandomOption(PostAPrioriProvider.VALID_CONTENTS);
    }

    getValidDate(): string {
        return PostAPrioriProvider.getRandomOption(PostAPrioriProvider.VALID_DATES);
    }

    getValidTime(): string {
        return PostAPrioriProvider.getRandomOption(PostAPrioriProvider.VALID_TIMES);
    }

    getInvalidDate(option: DATE_GENERATION_OPTIONS): string {
        switch (option) {
            case DATE_GENERATION_OPTIONS.PAST:
                return PostAPrioriProvider.INVALID_DATE_PAST;
            case DATE_GENERATION_OPTIONS.OVERFLOW:
                return PostAPrioriProvider.INVALID_DATE_OVERFLOW;
            case DATE_GENERATION_OPTIONS.LEAP_YEAR:
                return PostAPrioriProvider.INVALID_DATE_LEAP_YEAR;
            default:
                return this.getValidDate();
        }
    }

    getInvalidTime(option: TIME_GENERATION_OPTIONS): string {
        switch (option) {
            case TIME_GENERATION_OPTIONS.PAST:
                return PostAPrioriProvider.INVALID_TIME_PAST;
            case TIME_GENERATION_OPTIONS.OVERFLOW:
                return PostAPrioriProvider.INVALID_TIME_OVERFLOW;
            default:
                return this.getValidTime();
        }
    }
}