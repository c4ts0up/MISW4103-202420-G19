import { test as setup, expect } from '@playwright/test';
import * as path from 'path';
import {adminData} from "./data/admin";

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    // Perform authentication steps. Replace these actions with your own.
    await page.goto('ghost/#/signin');
    await page.locator('input[name="identification"]').fill(adminData.username);
    await page.locator('input[name="password"]').fill(adminData.password);
    await page.locator('button[type="submit"]').click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('ghost/#/dashboard');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: authFile });
});