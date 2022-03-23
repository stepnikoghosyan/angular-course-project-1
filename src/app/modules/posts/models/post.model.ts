import {UserModel} from "../../../models/user.model";
import {CommentModel} from "../../../models/comment.model";

export class CreatePostDto {
  title: string;
  body: string;
  image: FormData | null;

  constructor(data: any, file: FormData) {
    this.title = data.title;
    this.body = data.body;
    this.image = file.has('file') ? file : null;
  }
}




