import { UserModel } from "./user.model";

export interface CommentModel{
    commentId: number;
    message: string;
    userName: UserModel;
}