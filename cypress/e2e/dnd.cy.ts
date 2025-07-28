/// <reference types="cypress" />

describe('drag and drop ingredients into the constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

		cy.visit('http://localhost:5173/');
	});

	it('dragging a bun into the constructor', () => {
		cy.get('[data-testid=drop_container]').as('container');
		cy.get('[data-testid=drag_ingredient]')
			.contains('Краторная булка N-200i')
			.as('bun');

		cy.get('@container').contains('Краторная булка N-200i').should('not.exist');

		cy.get('@bun').find('img').trigger('dragstart');
		cy.get('@container').trigger('drop');

		cy.get('[data-testid=ingredient-constructor-bun-up]')
			.contains('Краторная булка N-200i')
			.should('exist');
		cy.get('[data-testid=ingredient-constructor-bun-down]')
			.contains('Краторная булка N-200i')
			.should('exist');
	});

	it('dragging a different ingredient into the constructor', () => {
		cy.get('[data-testid=drop_container]').as('container');
		cy.get('[data-testid=drag_ingredient]')
			.contains('Хрустящие минеральные кольца')
			.as('ingredientRings');

		cy.get('@ingredientRings').find('img').trigger('dragstart');
		cy.get('@container').trigger('drop');

		cy.get('[data-testid=drag_ingredient]')
			.contains('Соус традиционный галактический')
			.as('ingredientSauce');

		cy.get('@ingredientSauce').find('img').trigger('dragstart');
		cy.get('@container').trigger('drop');

		cy.get('@container')
			.find('[data-testid=ingredients-constructor]')
			.contains('Хрустящие минеральные кольца')
			.should('exist');

		cy.get('@container')
			.find('[data-testid=ingredients-constructor]')
			.contains('Соус традиционный галактический')
			.should('exist');
	});

	it('dragging a same ingredient into the constructor', () => {
		cy.get('[data-testid=drop_container]').as('container');
		cy.get('[data-testid=drag_ingredient]')
			.contains('Биокотлета из марсианской Магнолии')
			.as('ingredientСutlet');

		cy.get('@ingredientСutlet').find('img').trigger('dragstart');
		cy.get('@container').trigger('drop');

		cy.get('@ingredientСutlet').find('img').trigger('dragstart');
		cy.get('@container').trigger('drop');

		cy.get('@container')
			.find('[data-testid=ingredients-constructor]')
			.contains('Биокотлета из марсианской Магнолии')
			.should('exist');

		cy.get('@ingredientСutlet')
			.find('[class^=counter]')
			.contains('2')
			.should('exist');
	});
});
