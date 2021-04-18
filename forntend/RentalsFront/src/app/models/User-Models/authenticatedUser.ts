import { IUser } from "./user";

export interface IAuthenticatedUser{
    responseToken: string;
    requestingUser: IUser;
}