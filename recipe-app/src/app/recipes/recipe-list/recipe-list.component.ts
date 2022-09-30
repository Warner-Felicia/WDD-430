import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg'),
    new Recipe('Test Recipe 2', 'This is a second test', 'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg'),
    new Recipe('Test Recipe 3', 'This is a third test', 'https://cdn.pixabay.com/photo/2017/09/16/19/21/salad-2756467_960_720.jpg')
  ];
  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }

}
