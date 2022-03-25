import { UserModel } from "./user.model";

export class CommentModel{
    commentId: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    userName: UserModel;
    user: UserModel

    constructor(data: any){
        this.commentId = data.id,
        this.message = data.message,
        this.createdAt = data.createdAt,
        this.updatedAt = data.updatedAt,
        this.userName = data.userName,
        this.user = data.user
    }
}