import {faker} from "@faker-js/faker";
import RandExp from "randexp";

export enum NAME_GENERATION_OPTIONS {
    LONG = `^[A-Z][a-z]{91} [A-Z][a-z]{100}$`,
    SHORT = `^$`
}

export enum EMAIL_GENERATION_OPTIONS {
    LONG = `^[a-zA-Z0-9]{186}@[a-zA-Z]\\.[a-zA-Z]{3}$`,
    SHORT = `^$`,
    NO_AT = `^[a-zA-Z0-9]{3,50}(\\.[a-zA-Z]{2,3}){1,5}$`,
    NO_DOMAIN = `^[a-zA-Z0-9]{3,50}@[a-zA-Z]{3,10}$`,
    NO_AT_NO_DOMAIN = `^[a-zA-Z0-9]{3,50}$`,
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

    private memberName: string;
    private memberEmail: string;

    private generateInitialData(): void {
        this.memberName = faker.person.fullName();
        const [firstName, lastName] = this.memberName.split(' ');
        const randomSuffix = faker.string.alphanumeric(2);
        const commonDomains = ['.com', '.net', '.co'];
        const randomDomain = faker.helpers.arrayElement(commonDomains);
        const domainName = faker.internet.domainWord();
        this.memberEmail = `${firstName}${lastName}_${randomSuffix}@${domainName}${randomDomain}`;
    }

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        switch (option) {
            case EMAIL_GENERATION_OPTIONS.NO_AT:
                return this.memberEmail.replace('@', '');
            case EMAIL_GENERATION_OPTIONS.NO_DOMAIN:
                return this.memberEmail.split('@')[0] + '@example';
            case EMAIL_GENERATION_OPTIONS.SPECIAL_CHARACTERS:
                return this.memberEmail.replace(/[a-zA-Z0-9]/g, '!');
            case EMAIL_GENERATION_OPTIONS.NO_AT_NO_DOMAIN:
                return this.memberEmail.split('@')[0];
            default:
                return this.memberEmail.split('@')[0] + '@example';
        }
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        this.generateInitialData();
        switch (option) {
            case NAME_GENERATION_OPTIONS.LONG:
                const longNameSuffix = 'a'.repeat(1000);
                return `${this.memberName}${longNameSuffix}`;
            case NAME_GENERATION_OPTIONS.SHORT:
                return 'A';
            default:
                return this.memberName;
        }
    }

    getValidEmail(): string {
        return this.memberEmail;
    }

    getValidName(): string {
        this.generateInitialData();
        return this.memberName;
    }
}


/**
 * Obtiene los datos almacenados para las pruebas
 */
export class MemberAPrioriProvider implements MemberProvider {

    private valid_name: string;
    private valid_email: string;
    private used_name: boolean;
    private used_email: boolean;

    private static readonly VALID_NAMES = [
        "John Doe",
        "Jane Doe",
        "Pablo Perez",
        "Maria Garcia",
        "Carlos Rodriguez",
        "Ana Lopez",
        "Juan Perez",
        "Ana Maria",
        "Pedro Rodriguez",
        "Maria Perez",
        "Carlos Garcia",
        "Ana Rodriguez",
    ];

    private static readonly VALID_EMAILS = [
        "john.doe@example.com",
        "jane.doe@example.com",
        "pablo.perez@example.com",
        "maria.garcia@example.com",
        "carlos.rodriguez@example.com",
        "ana.lopez@example.com",
        "juan.perez@example.com",
        "ana.maria@example.com",
        "pedro.rodriguez@example.com",
        "maria.perez@example.com",
        "carlos.garcia@example.com",
        "ana.rodriguez@example.com"
    ];

    constructor() {
        this.generateInitialData();
        this.used_name = false;
        this.used_email = false;
    }

    private generateInitialData(): void {
        // las listas deben tener la misma longitud
        if (MemberAPrioriProvider.VALID_EMAILS.length != MemberAPrioriProvider.VALID_NAMES.length) {
            throw new Error("La longitud de la lista de nombres y correos no es igual");
        }

        const randomIndex = faker.number.int({min: 0, max: MemberAPrioriProvider.VALID_NAMES.length-1});

        this.valid_name = MemberAPrioriProvider.VALID_NAMES[randomIndex];
        this.valid_email = MemberAPrioriProvider.VALID_EMAILS[randomIndex];
    }  

    getInvalidEmail(option: EMAIL_GENERATION_OPTIONS): string {
        if (this.used_email) {
            this.generateInitialData();
            this.used_email = false;
            this.used_name = false;
        }
        this.used_email = true;
        switch (option) {
            case EMAIL_GENERATION_OPTIONS.NO_AT:
                return this.valid_email.replace('@', '');
            case EMAIL_GENERATION_OPTIONS.NO_DOMAIN:
                return this.valid_email.split('@')[0] + '@example';
            case EMAIL_GENERATION_OPTIONS.SPECIAL_CHARACTERS:
                return this.valid_email.replace(/[a-zA-Z0-9]/g, '!');
            case EMAIL_GENERATION_OPTIONS.NO_AT_NO_DOMAIN:
                return this.valid_email.split('@')[0];
            default:
                return this.valid_email.split('@')[0] + '@example';
        }
    }

    getInvalidName(option: NAME_GENERATION_OPTIONS): string {
        if (this.used_name) {
            this.generateInitialData();
            this.used_email = false;
            this.used_name = false;
        }
        this.used_name = true;
        switch (option) {
            case NAME_GENERATION_OPTIONS.LONG:
                const longNameSuffix = 'a'.repeat(1000);
                return `${this.valid_name}${longNameSuffix}`;
            case NAME_GENERATION_OPTIONS.SHORT:
                return 'A';
            default:
                return this.valid_name;
        }
    }

    getValidEmail(): string {
        if (this.used_email) {
            this.generateInitialData();
            this.used_email = false;
            this.used_name = false;
        }
        this.used_email = true;
        return this.valid_email;
    }

    getValidName(): string {
        if (this.used_name) {
            this.generateInitialData();
            this.used_email = false;
            this.used_name = false;
        }
        this.used_name = true;
        return this.valid_name;
    }
}
