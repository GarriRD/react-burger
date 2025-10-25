/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare namespace Cypress {
  interface Chainable {
    login(): void;
  }
}

Cypress.Commands.add('login', () => {
  const loginBox = '@login-box';
  cy.visit('/login').wait(500);
  cy.get('[data-testid="form-login"]').as('login-box')
  
  cy.get(loginBox)
      .find('[data-testid="form-login-email"]')
      .realClick({ position: 'center'})
      .wait(200)
      .realType('test9925@mail.com')
      .wait(200);
    
  cy.get(loginBox)
    .find('[data-testid="form-login-password"]')
    .realClick({ position: 'center'})
    .wait(200)
    .realType('test')
    .wait(200);

  cy.get(loginBox)
    .find('[data-testid="form-login-send"]')
    // 2 клика т.к. поле с пароле заранее выдаёт ошибку и сбивает обработчик событий, когда тот пытается кликнуть по
    // кнопке входа
    .realClick()
    .wait(200)
    .realClick()
    .wait(1000);
  cy.visit('/').wait(500);
  
})