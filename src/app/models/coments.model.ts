import { UserModel } from "./user.model";

export interface CommentsModel {
    createdAt: string;
    id: number;
    message: string;
    updatedAt: string;
    user: UserModel;
  }