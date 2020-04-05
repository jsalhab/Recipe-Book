import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "A Test Recipe",
  //     "This is simply a test",
  //     "https://img.taste.com.au/i6uNNUvx/taste/2018/02/mar-18_creamy-fettuccine-with-chicken-3000x2000-135690-1.jpg",
  //     [new Ingredient("Meat", 1), new Ingredient("Cheese", 2)]
  //   ),
  //   new Recipe(
  //     "Another Test Recipe",
  //     "This is simply a test",
  //     "https://img.taste.com.au/i6uNNUvx/taste/2018/02/mar-18_creamy-fettuccine-with-chicken-3000x2000-135690-1.jpg",
  //     [new Ingredient("Meat", 1), new Ingredient("Bread", 2)]
  //   )
  // ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice(); // return a copy of the array
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingLsit(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
