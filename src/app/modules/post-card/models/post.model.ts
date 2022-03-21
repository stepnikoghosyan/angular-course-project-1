import {UserModel} from "../../../models/user.model";
import {CommentModel} from "../../../models/comment.model";

export interface PostModel {
  id: number;
  title: string;
  body: string;
  imageUrl: string | null;
  user: UserModel;
  comments: CommentModel[];
}
