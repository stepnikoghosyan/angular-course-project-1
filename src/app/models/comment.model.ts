import { UserModel } from "./user.model";

export interface CommentModel{
    commentId: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    userName: UserModel;
    user: UserModel
}