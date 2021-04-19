export interface IUser{
    id: number;
    role: string;
    fName: string;
    lName: string;
    userName: string;
    password?: string;
    birthDate: Date;
    imageId: number;
}