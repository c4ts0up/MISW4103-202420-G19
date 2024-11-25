/**
 * Estrategia de generación de datos para los tests
 */
export enum DataGenerationStrategy {
    RANDOM, // completamente aleatorio
    PSEUDO_RANDOM, // aleatorio, pero datos se relacionan en el mismo esquema
    A_PRIORI // datos pre generados y almacenados
}

export const config = {
    evidence: {
        baseDirectory: 'evidence'
    },

    data: {
        memberStrategy: DataGenerationStrategy.A_PRIORI,
        postStrategy: DataGenerationStrategy.A_PRIORI,
        settingsStrategy: DataGenerationStrategy.A_PRIORI,
    },

    editorPage: {
        resource: 'ghost/#/editor/post'
    },

    scheduledPage: {
        resource: 'ghost/#/posts?type=scheduled'
    },

    loginPage: {
        resource: `ghost/#/signin`
    },

    membersPage: {
        resource: `ghost/#/members`
    },

    settingsPage: {
        resource: 'ghost/#/settings'
    },

    sut: {
        version: 5.96
    }
}