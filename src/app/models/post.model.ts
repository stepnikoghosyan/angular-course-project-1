import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export class PostModel {
    postId: number;
    title: string;
    body: string;
    image: string;
    user:UserModel
    comments: CommentModel[];

    constructor(data: any){
        this.postId = data.id;
        this.title = data.title;
        this.body = data.body;
        this.image = data.image;
        this.user = data.user       
        this. comments = data.comments;

    }

}