import { Page } from 'playwright';
import {BasePage} from "./basePage";

/**
 * Representa la página de login
 * Tomado del autor por problemas de compatibilidad entre ambas suites de pruebas
 * @author: marianadiaz179
 */
class LoginPage extends BasePage {
    private readonly emailInput: string;
    private readonly passwordInput: string;
    private readonly submitButton: string;

    constructor(page: Page, url: string) {
        super(page, url);
        this.emailInput = 'input[name="identification"]';
        this.passwordInput = 'input[name="password"]';
        this.submitButton = 'button[type="submit"]';
    }

    async login(email: string, password: string): Promise<void> {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.submitButton);
        await this.page.waitForURL("**/dashboard");
    }
}

export default LoginPage;
