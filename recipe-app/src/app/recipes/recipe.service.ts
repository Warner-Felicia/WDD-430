import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Tasty Shnitzel',
            'A super-tasty Shnitzel - just awesome!',
            'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]),
        new Recipe(
            'Big Fat Burger',
            'What else do you need to say',
            'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]),
        new Recipe(
            'Monterrey Chicken Skillet',
            'Chicken, cheese and BBQ sauce, yum!',
            'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg',
            [
                new Ingredient('chicken', 2),
                new Ingredient('rotel', 1),
                new Ingredient('fusili pasta', 1/2),
                new Ingredient('chicken broth', 2),
                new Ingredient('BBQ sauce', 1/3),
                new Ingredient('monterrey jack cheese', 1),
                new Ingredient('bacon', 3),
                new Ingredient('green onion', 2),
                
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}