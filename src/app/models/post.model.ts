import { CommentModel } from "./comment.model";

export class PostModel {
    postId: number;
    title: string;
    body: string;
    image: string;
    comments: CommentModel[];

    constructor(data: any){
        this.postId = data.id;
        this.title = data.title;
        this.body = data.body;
        this.image = data.image;
        this. comments = data.comments;

    }

}