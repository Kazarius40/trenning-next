import {IRecipe} from "@/models/recipes/IRecipe";

export interface IRecipes {
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}