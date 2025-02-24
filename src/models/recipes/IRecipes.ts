import {IRecipe} from "@/app/models/recipes/IRecipe";

export interface IRecipes {
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}