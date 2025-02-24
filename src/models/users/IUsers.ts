import {IUser} from "@/app/models/user/IUser";

export interface IUsers {
    users: IUser[],
    total: number,
    skip: number,
    limit: number
}