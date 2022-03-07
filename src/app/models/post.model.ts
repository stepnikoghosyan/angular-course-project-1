import { CommentsModel } from "./coments.model";
import { UserModel } from "./user.model";

export interface PostModel {
  title: string;
  body: string;
  id: number;
  imageUrl: string;
  comments: CommentsModel[];
  user: UserModel;
}




