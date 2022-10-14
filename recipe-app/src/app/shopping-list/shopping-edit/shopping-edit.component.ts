import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/shopping-list.service';

@Component({
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
    selector: 'app-shopping-edit'
})
export class ShoppingEditComponent {
    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;

    constructor(private shoppingListService: ShoppingListService) {}

    addToList() {
        const ingredientName = this.nameInputRef.nativeElement.value;
        const ingredientAmount = this.amountInputRef.nativeElement.value;

        const newIngredient = new Ingredient(ingredientName, ingredientAmount);
        this.shoppingListService.addIngredient(newIngredient);
        
    }
}