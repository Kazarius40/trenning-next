import {IUser} from "@/models/user/IUser";

export interface IUsers {
    users: IUser[],
    total: number,
    skip: number,
    limit: number
}