import { Component } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Component({
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    selector: 'app-shopping-list'

})

export class ShoppingListComponent {
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
    ];

    onIngredientAdded(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
    }
}
