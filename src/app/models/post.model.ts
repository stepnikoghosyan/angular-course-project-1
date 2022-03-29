import { CommentsModel } from "./coments.model";
import { UserModelDto } from 'src/app/models/user.model'
export class PostDto {
    title: string;
    body: string;
    image: File | null
    constructor(data: any, img: File | null) {
        this.title = data.title;
        this.body = data.body;
        this.image = img
    }
}

export class PostsModelDto {
    title: string;
    body: string;
    id: number;
    imageUrl: string | null;
    comments: CommentsModel[];
    user: UserModelDto;

    constructor(data: any) {
        this.title = data.title,
            this.body = data.body,
            this.id = data.id,
            this.imageUrl = data.imageUrl,
            this.comments = data.comments,
            this.user = data.user

    }
}