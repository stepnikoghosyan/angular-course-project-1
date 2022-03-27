import { CommentModel } from "./comment.model";
import { UserModel } from "./user.model";

export interface PostModel {
    id: number;
    title: string;
    body: string;
    createdAt: string
    imageUrl: string | null;
    user: UserModel
    comments: CommentModel[];
}
export class BasePostMOdel {
    title: string;
    body: string;
    image: string;

    constructor(data: any) {
        this.title = data.title,
            this.body = data.body,
            this.image = data.imageUrl
    }
}

export class PostModelDto extends BasePostMOdel {
    updateAt: string;
    
    constructor(data: any, updateAt: string) {
        super(data);
        this.updateAt = updateAt;
    }
}

export class CreatePostModelDto {
    title: string;
    body: string;
    image: FormData | null;
    constructor(data: any, image: FormData) {
        this.body = data.body;
        this.title = data.title;
        this.image = image.has("image") ? image : null
    }
}

