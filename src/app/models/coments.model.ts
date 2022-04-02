import { UserModelDto } from "./user.model";

export interface CommentsModel {
  createdAt: string;
  id: number;
  message: string;
  updatedAt: string;
  user: UserModelDto;
}

export interface createCommentModel {
  message: string
}