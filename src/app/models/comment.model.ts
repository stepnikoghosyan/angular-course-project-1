import {UserModel} from "./user.model";

export interface CommentModel {
  id: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserModel;
}
