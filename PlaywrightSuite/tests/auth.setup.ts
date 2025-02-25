import {expect, test as setup} from '@playwright/test';
import * as path from 'path';
import {adminData} from "./data/admin";
import logger from "./utils/logger";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    logger.info("Setting up authentication");
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('ghost/#/signin');
    await page.getByLabel('Email address').fill(adminData.username);
    await page.getByLabel('Password').fill(adminData.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    logger.info("Navigating to dashboard");
    await page.waitForURL('ghost/#/dashboard');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

    // End of authentication steps.
    logger.info(`Saving auth data to authFile = ${authFile}`);
    await page.context().storageState({ path: authFile });
});