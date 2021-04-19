import { IUser } from "../models/User-Models/user";

export class Sorter{
    static compareRole(userA: IUser, userB: IUser): number {
        if (userA.role == 'User' && (userB.role == 'Employee' || userB.role == 'Manager')) {
            return -1;
        }
        if (userA.role == 'Employee' && (userB.role == 'User' || userB.role == 'Manager')) {
            return 1;
        }
        return 0;
    }
}