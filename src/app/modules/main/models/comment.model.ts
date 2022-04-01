import { UserModel } from "./user.model";

export class CommentModel{
    commentId: number;
    message: string;
    createdAt: string;
    updatedAt: string;
    user: UserModel

    constructor(data: any){
        this.commentId = data.id,
        this.message = data.message,
        this.createdAt = data.createdAt,
        this.updatedAt = data.updatedAt,
        this.user = data.user
    }
}