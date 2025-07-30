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
		cy.visit('http://localhost:5173/');
	});

	it('sending an order and receiving order information', () => {
		cy.get('[data-testid=drag_ingredient]')
			.contains('Мясо бессмертных моллюсков Protostomia')
			.find('img')
			.trigger('dragstart');
		cy.wait(500);

		cy.get('[data-testid=drop_container]').trigger('drop');
		cy.wait(500);

		cy.get('[data-testid=ingredients-constructor]')
			.contains('Мясо бессмертных моллюсков Protostomia')
			.should('exist');

		cy.get('[data-testid=button_order]').click();

		cy.get('[data-testid=modal]').as('modal');

		cy.get('@modal').should('exist');
		cy.get('@modal').contains('85373').should('exist');
		cy.get('@modal').contains('идентификатор заказа').should('exist');
	});
});
