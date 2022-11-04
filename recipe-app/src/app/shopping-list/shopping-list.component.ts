import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/shopping-list.service';

@Component({
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.css'],
    selector: 'app-shopping-list'

})

export class ShoppingListComponent implements OnInit, OnDestroy{
    ingredients: Ingredient[];
    private igChangeSub: Subscription

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        });
    }

    ngOnDestroy(): void {
        this.igChangeSub.unsubscribe();
    }

    onEditItem(index: number) {
        this.shoppingListService.startedEditing.next(index);
    }
    
}
