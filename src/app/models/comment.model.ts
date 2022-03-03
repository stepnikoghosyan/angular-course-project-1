import { IUser } from "./user.model";

export interface IComment {
    id: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    user: IUser;
}