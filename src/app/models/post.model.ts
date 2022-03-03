import { IComment } from "./comment.model";
import { IUser } from "./user.model";

export interface IPost {
    id: number;
    title: string;
    body: string;
    user: IUser;
    comments: IComment[];
    imageUrl: string;
}