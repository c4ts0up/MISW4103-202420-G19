/**
 * Contenedor de generadores de datos para las pruebas
 */
import {DataGenerationStrategy} from "../config/config";
import {MemberAPrioriProvider, MemberProvider, MemberRandomProvider, MemberRelatedProvider} from "./memberProvider";
import {PostAPrioriProvider, PostProvider, PostRandomProvider, PostRelatedProvider} from "./postProvider";
import {
    SettingsAPrioriProvider,
    SettingsProvider,
    SettingsRandomProvider,
    SettingsRelatedProvider
} from "./settingsProvider";
import logger from "../utils/logger";

export class DataProvider {
    public readonly memberProvider: MemberProvider;
    public readonly postProvider: PostProvider;
    public readonly settingsProvider: SettingsProvider;

    /**
     * Construye con base en la estrategia elegida
     * @param memberStrategy estrategia de generación de datos para los miembros
     * @param postStrategy estrategia de generación de datos para los posts
     * @param settingsStrategy estrategia de generación de datos para las configuraciones de admin
     */
    constructor(
        memberStrategy: DataGenerationStrategy,
        postStrategy: DataGenerationStrategy,
        settingsStrategy: DataGenerationStrategy
    ) {
        // MemberProvider
        logger.info(`Estrategia de provisión de datos de "member": ${memberStrategy.toString()}`);
        if (memberStrategy == DataGenerationStrategy.RANDOM) {
            this.memberProvider = new MemberRandomProvider();
        }
        else if (memberStrategy == DataGenerationStrategy.PSEUDO_RANDOM) {
            this.memberProvider = new MemberRelatedProvider();
        }
        else {
            this.memberProvider = new MemberAPrioriProvider();
        }

        // PostProvider
        logger.info(`Estrategia de provisión de datos de "settings": ${postStrategy.toString()}`);
        if (postStrategy == DataGenerationStrategy.RANDOM) {
            this.postProvider = new PostRandomProvider();
        }
        else if (postStrategy == DataGenerationStrategy.PSEUDO_RANDOM) {
            this.postProvider = new PostRelatedProvider();
        }
        else {
            this.postProvider = new PostAPrioriProvider();
        }

        // SettingsProvider
        logger.info(`Estrategia de provisión de datos de "settings": ${settingsStrategy.toString()}`);
        if (settingsStrategy == DataGenerationStrategy.RANDOM) {
            this.settingsProvider = new SettingsRandomProvider();
        }
        else if (settingsStrategy == DataGenerationStrategy.PSEUDO_RANDOM) {
            this.settingsProvider = new SettingsRelatedProvider();
        }
        else {
            this.settingsProvider = new SettingsAPrioriProvider();
        }
    }
}