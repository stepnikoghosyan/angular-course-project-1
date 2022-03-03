import {UserModel} from "./user.model";

export class CommentModel {
  id: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserModel;

  constructor(data: any) {
    this.id = data.id;
    this.message = data.message;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.user = new UserModel(data.user);
  }
}
