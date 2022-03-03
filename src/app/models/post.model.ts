import {UserModel} from "./user.model";
import {CommentModel} from "./comment.model";

export class PostModel {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
  user: UserModel;
  comments: CommentModel[];

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.imageUrl = data.imageUrl;
    this.user = new UserModel(data.user);
    this.comments = data.comments.map((item: any) => new CommentModel(item));
  }
}
