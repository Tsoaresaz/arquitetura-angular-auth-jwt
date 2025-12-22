import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('http://localhost:4200/login');
  }

  async login(email: string, password: string) {
    await this.page.getByTestId('email-input').fill(email);
    await this.page.getByTestId('password-input').fill(password);

    await this.page.getByTestId('login-button').click();

    await this.page.waitForURL('**/home');
  }

  async logout(email: string, password: string) {
    this.login(email, password);

    await this.page.getByTestId('logout-button').click();

    await this.page.waitForURL('**/login');
  }

  async expectError(message: string) {
    await expect(
      this.page.locator('[data-testid="email-error"]')
    ).toContainText(message);
  }
}
