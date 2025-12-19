describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.intercept('POST', '**/login').as('loginRequest');
  });

  describe('Login - Validações do formulário', () => {
    it('deve mostrar erro ao sair do input de e-mail vazio', () => {
      cy.get('[data-testid="email-input"]').focus().blur();

      cy.get('[data-testid="email-error"]')
        .should('be.visible')
        .and('contain.text', 'E-mail é obrigatório');
    });

    it('deve exibir mensagem de e-mail no formato inválido', () => {
      cy.get('[data-testid="email-input"]').type('teste01mail.com').blur();

      cy.get('[data-testid="email-error"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'Formato inválido');
    });

    it('deve mostrar erro ao sair do input password vazio', () => {
      cy.get('[data-testid="password-input"]').focus().blur();

      cy.get('[data-testid="password-error"]')
        .should('be.visible')
        .and('contain.text', 'Senha é obrigatório');
    });

    it('deve exibir a mensagem quando a senha informada for menor que 6', () => {
      cy.get('[data-testid="password-input"]').type('123').blur();

      cy.get('[data-testid="password-error"]')
        .should('exist')
        .and('be.visible')
        .and('contain.text', 'Senha deve ter pelo menos 6 caracteres');
    });
  });

  describe('Login - Sucesso', () => {
    it('deve abrir a tela de login', () => {
      cy.get('[data-testid="login-button"]')
        .should('be.visible')
        .and('contain.text', 'login');
    });

    it('deve fazer login com sucesso e redirect para /home', () => {
      cy.login();

      cy.url().should('include', '/home');
    });

    it('deve salvar o token no localStorage após login', () => {
      cy.login();

      cy.wait('@loginRequest');

      cy.window()
        .its('localStorage')
        .invoke('getItem', 'auth_token')
        .should('not.be.null');
    });

    describe('Logout - Sucesso', () => {
      it('deve fazer o logout com sucesso', () => {
        cy.login();

        cy.window()
          .its('localStorage')
          .invoke('getItem', 'auth_token')
          .should('exist');

        cy.get('[data-testid="logout-button"]').click();

        cy.get('[data-testid="login-button"]')
          .should('be.visible')
          .and('contain.text', 'login');
      });

      it('deve fazer logout e verificar se não existe token no localStorage', () => {
        cy.login();

        cy.wait('@loginRequest');

        cy.window()
          .its('localStorage')
          .invoke('getItem', 'auth_token')
          .should('exist');

        cy.get('[data-testid="logout-button"]').click();

        cy.window()
          .its('localStorage')
          .invoke('getItem', 'auth_token')
          .should('be.null');
      });
    });
  });
});
