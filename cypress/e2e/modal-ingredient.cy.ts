/// <reference types="cypress" />

describe('opening/closing a modal window with a description of the ingredient', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

		cy.visit('http://localhost:5173/');
	});

	it('opening a modal window with a description of the ingredient', () => {
		cy.get('[data-testid=drag_ingredient]')
			.contains('Хрустящие минеральные кольца')
			.as('ingredientRings');

		cy.get('@ingredientRings').click();

		cy.get('[data-testid=modal]').as('modal');

		cy.get('@modal').should('exist');
		cy.get('@modal').contains('Детали ингредиента').should('exist');
		cy.get('@modal').contains('Хрустящие минеральные кольца').should('exist');
		cy.get('@modal').contains('808').should('exist');
		cy.get('@modal').contains('689').should('exist');
		cy.get('@modal').contains('609').should('exist');
		cy.get('@modal').contains('986').should('exist');
	});

	it('closing the modal window  by clicking on the cross', () => {
		cy.get('[data-testid=drag_ingredient]')
			.contains('Хрустящие минеральные кольца')
			.as('ingredientRings');

		cy.get('@ingredientRings').click();

		cy.get('[data-testid=modal]').as('modal');

		cy.get('@modal').find('button').as('button');
		cy.get('@button').click();

		cy.get('@modal').should('not.exist');
	});

	it('closing the modal window  by clicking on the overlay', () => {
		cy.get('[data-testid=drag_ingredient]')
			.contains('Соус традиционный галактический')
			.as('ingredientSauce');

		cy.get('@ingredientSauce').click();

		cy.get('[data-testid=modal]').as('modal');
		cy.get('[data-testid=modal-overlay]').as('modalOverlay');

		cy.get('@modalOverlay').click({ force: true });

		cy.get('@modal').should('not.exist');
	});

	it('close modal window  when pressing key Esc', () => {
		cy.get('[data-testid=drag_ingredient]')
			.contains('Соус традиционный галактический')
			.as('ingredientSauce');

		cy.get('@ingredientSauce').click();

		cy.get('[data-testid=modal]').as('modal');

		cy.get('body').type('{esc}');

		cy.get('@modal').should('not.exist');
	});
});
