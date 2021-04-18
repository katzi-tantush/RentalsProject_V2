import { findReadVarNames } from "@angular/compiler/src/output/output_ast";
import { ILoggedInUser } from "../models/User-Models/ILoggefInUser";
import { IUser } from "../models/User-Models/user";

export class UserFactory{
    static userToLoggedInUser(user: IUser): ILoggedInUser {
        let { id, fName, lName, userName, role } = user;

        let loggedInUser: ILoggedInUser = {
            id: id,
            fName: fName,
            lName: lName,
            userName: userName,
            role: role
        };

        return loggedInUser;
    }
}