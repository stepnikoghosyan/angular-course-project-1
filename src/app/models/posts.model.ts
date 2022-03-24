import { CommentsModel } from "./coments.model";
import { UserModelDto } from "./user.model";

export interface PostsModel {
  title: string;
  body: string;
  id: number;
  imageUrl: string|null;
  comments: CommentsModel[];
  user: UserModelDto;
}




