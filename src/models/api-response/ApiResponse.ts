import {IUser} from "@/models/user/IUser";
import {IUsers} from "@/models/users/IUsers";
import {IRecipe} from "@/models/recipes/IRecipe";
import {IRecipes} from "@/models/recipes/IRecipes";

export type ApiResponse = IUser[] | IUsers | IRecipe[] | IRecipes;