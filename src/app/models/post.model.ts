import {UserModel} from "./user.model";
import {CommentModel} from "./comment.model";

export interface PostModel {
  id: number;
  title: string;
  body: string;
  imageUrl: string | null;
  user: UserModel;
  comments: CommentModel[];
}
