import {Page} from "@playwright/test";

export class BasePage {
    protected page: Page;
    protected readonly resource: string;

    constructor(page: Page, resource: string) {
        this.page = page;
        this.resource = resource;
    }

    async navigateTo() {
        await this.page.goto(
            this.resource,
            {
                waitUntil: 'domcontentloaded'
            }
        );
    }
}