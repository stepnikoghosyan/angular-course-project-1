import { UserModel } from "./user.model";
import { CommentModel } from "./comment.model";

export interface PostModel {
  id: number;
  title: string;
  body: string;
  imageUrl: string | null;
  user: UserModel;
  comments: CommentModel[];
  createdAt: Date;
}

export interface PostFormModel {
  title: string;
  body: string;
  image: File | null;
}

export interface PostEntityModel {
  post: PostModel;
  comments: CommentModel[];
}