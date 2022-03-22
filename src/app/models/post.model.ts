import { Title } from "@angular/platform-browser";
import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export class PostModel {
    id: number;
    title: string;
    body: string;
    createdAt:Date;
    imageUrl: string | null;
    user: UserModel
    comments: CommentModel[];

    constructor(data: any){
        this.id = data.id;
        this.title = data.title;
        this.body = data.body;
        this.createdAt = data.createdAt
        this.imageUrl = data.imageUrl;
        this.user = data.user       
        this. comments = data.comments;
    }

}

export class PostModelDto{
    title: string;
    body: string;
    imageUrl: string;
    updatedAt: string;

       constructor(data: any){
        this.title = data.title,
        this.body = data.body,
        this.imageUrl = data.imageUrl
        this.updatedAt = data.updatedAt
    }
}

export class createCommentDto {
    message :string

    constructor(data:any) {
        this.message = data.message
    }
}