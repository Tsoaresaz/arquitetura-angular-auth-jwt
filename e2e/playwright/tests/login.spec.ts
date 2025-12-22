import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login - Playwright', () => {
  const emailValid = 'teste01@mail.com';
  const passwordValid = '123456';

  const emailInvalid = 'test01mail.com';
  const passwordInvalid = '123';

  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
  });

  test.describe('Login - Cenários de erros', () => {
    test('deve exibir o erro ao sair do input e-mail vazio', async ({
      page,
    }) => {
      await page.getByTestId('email-input').focus();
      await page.getByTestId('password-input').focus();

      await expect(page.getByTestId('email-error')).toBeVisible();
    });

    test('deve exibir erro ao sair do input password vazio', async ({
      page,
    }) => {
      await page.getByTestId('password-input').focus();
      await page.getByTestId('email-input').focus();

      await expect(page.getByTestId('password-error')).toBeVisible();
    });

    test('deve exibir erro de e-mail no formato inválido', async ({ page }) => {
      await page.getByTestId('email-input').fill(emailInvalid);
      await page.getByTestId('password-input').focus();

      await expect(page.getByTestId('email-error')).toHaveText(
        'Formato inválido'
      );
      await expect(page.getByTestId('login-button')).toBeDisabled();
    });

    test('deve testar cenário com senha menor que 6 caracteres', async ({
      page,
    }) => {
      await page.getByTestId('email-input').fill(emailValid);
      await page.getByTestId('password-input').fill(passwordInvalid);
      await page.getByTestId('password-input').blur();

      await expect(page.getByTestId('password-error')).toHaveText(
        'Senha deve ter pelo menos 6 caracteres'
      );
      await expect(page.getByTestId('login-button')).toBeDisabled();
    });
  });

  test.describe('Login - Cenários de sucesso', () => {
    test('deve fazer login com sucesso usando LoginPage', async ({ page }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(emailValid, passwordValid);

      await expect(page).toHaveURL(/home/);
    });

    test('deve fazer o login com sucesso', async ({ page }) => {
      await page.getByTestId('email-input').fill(emailValid);
      await page.getByTestId('password-input').fill(passwordValid);

      await page.getByTestId('login-button').click();

      await expect(page).toHaveURL(/home/);
    });

    test('deve após o login verificar se existe o token no localStorage', async ({
      page,
    }) => {
      await page.getByTestId('email-input').fill(emailValid);
      await page.getByTestId('password-input').fill(passwordValid);
      await page.getByTestId('login-button').click();

      await page.waitForURL('**/home');

      await expect
        .poll(() => {
          return page.evaluate(() => localStorage.getItem('auth_token'));
        })
        .not.toBeNull();
    });
  });

  test.describe('Login - Cenário de logout', () => {
    test('deve fazer o logout com sucesso e limpar o localStorage', async ({
      page,
    }) => {
      const login = new LoginPage(page);
      await login.goto();
      await login.login(emailValid, passwordValid);

      await expect
        .poll(() => {
          return page.evaluate(() => localStorage.getItem('auth_token'));
        })
        .not.toBeNull();

      await page.getByTestId('logout-button').click();

      await page.waitForURL('**/login');

      await expect
        .poll(() => {
          return page.evaluate(() => localStorage.getItem('auth_token'));
        })
        .toBeUndefined();
    });
  });
});
