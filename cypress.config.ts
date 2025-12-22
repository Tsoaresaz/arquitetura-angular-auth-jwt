import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'e2e/cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'e2e/cypress/support/e2e.ts',
    fixturesFolder: 'e2e/cypress/fixtures',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
