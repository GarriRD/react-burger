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
    const buttonOrder = '@buttonOrder';
    const burgerConstructor = '@burgerConstructor';

    cy.login();
    cy.get('[data-testid="burger-constructor"]').as(burgerConstructor.replace('@', ''));
    cy.get('[data-testid="button-order"]').as(buttonOrder.replace('@', ''));

    cy.get(buttonOrder)
      .should('be.disabled');


    cy.get('[data-testid^="bun"]')
      .first()
      .drag(burgerConstructor);
    
    cy.get('[data-testid^="sauce"]')
      .first()
      .drag(burgerConstructor);

    
    cy.get(buttonOrder)
      .should('be.enabled')
      .wait(200)
      .realClick()
      .wait(200);
    
    cy.get('[data-testid="orderid"]', { timeout: 20000 })
      .should('be.visible');

    
  });
})