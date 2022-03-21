import { UserModel } from "./user.model";

export interface CommentModel{
    Id: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    user: UserModel
}

export interface commentsResponse {
    count:number
    results:CommentModel[]
}