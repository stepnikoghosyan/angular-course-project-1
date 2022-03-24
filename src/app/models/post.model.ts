export class PostDto {
    title: string;
    body: string;
    image: { file: { type: "string", format: "binary" } };
    constructor(data: any, img: any) {
        this.title = data.title;
        this.body = data.body;
        this.image = { file: img }
    }
}