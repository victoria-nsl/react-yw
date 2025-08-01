import {
	container,
	ingredientsСonstructor,
	dragIngredient,
} from './../../src/utils/helpers';

/// <reference types="cypress" />

describe('drag and drop ingredients into the constructor', () => {
	beforeEach(() => {
		cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
		cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });

		cy.visit('');
	});

	it('dragging a bun into the constructor', () => {
		cy.get(dragIngredient).contains('Краторная булка N-200i').as('bun');

		cy.get(container).contains('Краторная булка N-200i').should('not.exist');

		cy.get('@bun').find('img').trigger('dragstart');
		cy.wait(500);
		cy.get(container).trigger('drop');
		cy.wait(500);

		cy.get('[data-testid=ingredient-constructor-bun-up]')
			.contains('Краторная булка N-200i')
			.should('exist');
		cy.get('[data-testid=ingredient-constructor-bun-down]')
			.contains('Краторная булка N-200i')
			.should('exist');
	});

	it('dragging a different ingredient into the constructor', () => {
		cy.get(dragIngredient)
			.contains('Мини-салат Экзо-Плантаго')
			.as('ingredientSalad');

		cy.get('@ingredientSalad').find('img').trigger('dragstart');
		cy.wait(500);
		cy.get(container).trigger('drop');
		cy.wait(500);

		cy.get(dragIngredient)
			.contains('Соус традиционный галактический')
			.as('ingredientSauce');

		cy.get('@ingredientSauce').find('img').trigger('dragstart');
		cy.wait(500);
		cy.get(container).trigger('drop');
		cy.wait(500);

		cy.get(ingredientsСonstructor)
			.contains('Мини-салат Экзо-Плантаго')
			.should('exist');

		cy.get(ingredientsСonstructor)
			.contains('Соус традиционный галактический')
			.should('exist');
	});

	it('dragging a same ingredient into the constructor', () => {
		cy.get(dragIngredient)
			.contains('Биокотлета из марсианской Магнолии')
			.as('ingredientСutlet');

		cy.get('@ingredientСutlet').find('img').trigger('dragstart');
		cy.wait(500);
		cy.get(container).trigger('drop');
		cy.wait(500);

		cy.get('@ingredientСutlet').find('img').trigger('dragstart');
		cy.wait(500);
		cy.get(container).trigger('drop');
		cy.wait(500);

		cy.get(
			`${ingredientsСonstructor} li:contains("Биокотлета из марсианской Магнолии")`
		).should('length', 2);

		cy.get('@ingredientСutlet')
			.find('[class^=counter]')
			.contains('2')
			.should('exist');
	});
});
