import { test as baseTest } from '@playwright/test';
import {DataProvider} from "../data/dataProvider";
import {config} from "../config/config";

// Extend base test with MemberProvider
type DataGenerationFixture = {
    dataProvider: DataProvider;
};

/**
 * Fixture para crear los generadores de datos para cada prueba
 *
 */
export const test = baseTest.extend<DataGenerationFixture>({
    dataProvider: async ({}, use) => {
        const provider = new DataProvider(
            config.data.memberStrategy,
            config.data.postStrategy,
            config.data.settingsStrategy
        ); // Replace with desired implementation
        await use(provider);
    },
});
