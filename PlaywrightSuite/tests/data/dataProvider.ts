/**
 * Contenedor de generadores de datos para las pruebas
 */
import {DataGenerationStrategy} from "../config/config";
import {MemberAPrioriProvider, MemberProvider, MemberRandomProvider, MemberRelatedProvider} from "./memberProvider";
import {
    SettingsAPrioriProvider,
    SettingsProvider,
    SettingsRandomProvider,
    SettingsRelatedProvider
} from "./settingsProvider";
import logger from "../utils/logger";

class DataProvider {
    private readonly memberProvider: MemberProvider;
    // TODO: add post provider
    private readonly settingsProvider: SettingsProvider;

    /**
     * Construye con base en la estrategia elegida
     * @param strategy
     */
    constructor(strategy: DataGenerationStrategy) {
        logger.info(`Estrategia de provisión de datos: ${strategy.toString()}`);
        if (strategy == DataGenerationStrategy.RANDOM) {
            this.memberProvider = new MemberRandomProvider();
            this.settingsProvider = new SettingsRandomProvider();
        }
        else if (strategy == DataGenerationStrategy.PSEUDO_RANDOM) {
            this.memberProvider = new MemberRelatedProvider();
            this.settingsProvider = new SettingsRelatedProvider();
        }
        else {
            this.memberProvider = new MemberAPrioriProvider()
            this.settingsProvider = new SettingsAPrioriProvider()
        }
    }
}