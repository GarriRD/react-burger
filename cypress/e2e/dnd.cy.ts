describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('Check that elements exist', () => {
    cy.get('[data-testid="burger-section"').should('be.visible');
    cy.get('[data-testid="burger-constructor"').should('be.visible');
    cy.get('[data-testid^="bun"]').should('have.length', 2);
  });

  it('Check order can be created', () => {
    cy.get('[data-testid="button-profile"]')
      .realClick()
    
    cy.get('[data-testid="form-login"]')
      .find('[data-testid="form-login-email"]')
      .realClick({ position: 'center'})
      .wait(200)
      .realType('test9925@mail.com')
      .wait(200);
    
    cy.get('[data-testid="form-login"]')
      .find('[data-testid="form-login-password"]')
      .realClick({ position: 'center'})
      .wait(200)
      .realType('test')
      .wait(200);

    cy.get('[data-testid="form-login"]')
      .find('[data-testid="form-login-send"]')
      // 2 клика т.к. поле с пароле заранее выдаёт ошибку и сбивает обработчик событий, когда тот пытается кликнуть по
      // кнопке входа
      .realClick()
      .wait(200)
      .realClick();

    cy.get('[data-testid="button-constructor"]')
      .realClick()
      .wait(200);

    cy.get('[data-testid="button-order"]')
      .should('be.disabled');


    cy.get('[data-testid^="bun"]')
      .first()
      .drag('[data-testid="burger-constructor"');
    
    cy.get('[data-testid^="sauce"]')
      .first()
      .drag('[data-testid="burger-constructor"');

    
    cy.get('[data-testid="button-order"]')
      .should('be.enabled')
      .wait(200)
      .realClick()
      .wait(200);
    
    cy.get('[data-testid="orderid"]', { timeout: 20000 })
      .should('be.visible');

    
    
  });
})