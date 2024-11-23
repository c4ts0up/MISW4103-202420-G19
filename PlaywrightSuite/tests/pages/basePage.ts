import {Page} from "@playwright/test";
import logger from "../utils/logger";

export class BasePage {
    protected page: Page;
    protected readonly resource: string;

    constructor(page: Page, resource: string) {
        this.page = page;
        this.resource = resource;
    }

    getResource () {
        return this.resource
    }

    async reload() {
        logger.info(`Reloading page in ${this.resource}`);
        await this.page.reload(
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    async navigateTo() {
        logger.info(`Navigating to ${this.resource}`);
        await this.page.goto(
            this.resource,
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }

    async waitTime(time_ms: number) {
        logger.info(`Waiting ${time_ms} ms for timeout`);
        await this.page.waitForTimeout(time_ms);
    }
}