export interface PostModel {
    title: string;
    body: string;
    id: number;
    imageUrl: string;
    comments: Comments;

}

export interface Comments {
    createdAt:string,
    id:number,
    message:string,
    updatedAt:string
}
