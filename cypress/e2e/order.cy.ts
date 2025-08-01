import {
	container,
	ingredientsСonstructor,
	modal,
	dragIngredient,
} from './../../src/utils/helpers';

/// <reference types="cypress" />

describe('make an order', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
		cy.intercept('POST', 'api/orders', { fixture: 'order.json' });

		window.localStorage.setItem(
			'accessToken',
			JSON.stringify('test-accessToken')
		);
		window.localStorage.setItem(
			'refreshToken',
			JSON.stringify('test-refreshToken')
		);
		cy.visit('');
	});

	it('sending an order and receiving order information', () => {
		cy.get(dragIngredient)
			.contains('Мясо бессмертных моллюсков Protostomia')
			.find('img')
			.trigger('dragstart');
		cy.wait(500);

		cy.get(container).trigger('drop');
		cy.wait(500);

		cy.get(ingredientsСonstructor)
			.contains('Мясо бессмертных моллюсков Protostomia')
			.should('exist');

		cy.get('[data-testid=button_order]').click();

		cy.get(modal).should('exist');
		cy.get(modal).contains('85373').should('exist');
		cy.get(modal).contains('идентификатор заказа').should('exist');
	});
});
