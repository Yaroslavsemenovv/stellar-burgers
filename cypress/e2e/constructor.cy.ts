describe('constructor page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', '**/api/orders/all', {
      body: {
        success: true,
        orders: [],
        total: 0,
        totalToday: 0
      }
    }).as('getFeed');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('adds bun and filling to constructor', () => {
    cy.get('[data-cy="ingredient-add-bun-1"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-add-main-1"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-add-sauce-1"]').contains('Добавить').click();

    cy.get('[data-cy="constructor-bun-top"]').should(
      'contain.text',
      'Флюоресцентная булка R2-D3'
    );
    cy.get('[data-cy="constructor-bun-bottom"]').should(
      'contain.text',
      'Флюоресцентная булка R2-D3'
    );
    cy.get('[data-cy="constructor-ingredients"]').should(
      'contain.text',
      'Биокотлета из марсианской Магнолии'
    );
    cy.get('[data-cy="constructor-ingredients"]').should(
      'contain.text',
      'Соус Spicy-X'
    );
  });

  it('opens and closes ingredient modal by close button and overlay', () => {
    cy.get('[data-cy="ingredient-link-main-1"]').click();

    cy.get('[data-cy="modal"]').should('be.visible').within(() => {
      cy.contains('Детали ингредиента').should('be.visible');
      cy.contains('Биокотлета из марсианской Магнолии').should('be.visible');
    });

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="ingredient-link-sauce-1"]').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('creates order, closes modal and clears constructor', () => {
    cy.setCookie('accessToken', 'Bearer mockAccessToken');
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mockRefreshToken');
    });

    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as('createOrder');

    cy.get('[data-cy="ingredient-add-bun-1"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-add-main-1"]').contains('Добавить').click();
    cy.get('[data-cy="ingredient-add-sauce-1"]').contains('Добавить').click();

    cy.get('[data-cy="order-button"]').contains('Оформить заказ').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain.text', '12345');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.contains('Выберите булки').should('have.length.at.least', 1);
    cy.contains('Выберите начинку').should('be.visible');
    cy.get('[data-cy="constructor-ingredients"]').should('not.contain.text', 'Биокотлета');
    cy.get('[data-cy="constructor-ingredients"]').should('not.contain.text', 'Соус Spicy-X');
  });
});