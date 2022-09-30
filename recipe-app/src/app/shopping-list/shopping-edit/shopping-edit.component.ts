import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.css'],
    selector: 'app-shopping-edit'
})
export class ShoppingEditComponent {
@ViewChild('nameInput') nameInputRef: ElementRef;
@ViewChild('amountInput') amountInputRef: ElementRef;
@Output() addedItem = new EventEmitter<Ingredient>();

    addToList() {
        const ingredientName = this.nameInputRef.nativeElement.value;
        const ingredientAmount = this.amountInputRef.nativeElement.value;

        const newIngredient = new Ingredient(ingredientName, ingredientAmount);
        this.addedItem.emit(newIngredient);
    }
}