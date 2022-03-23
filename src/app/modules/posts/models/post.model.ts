export class CreatePostDto {
  title: string;
  body: string;
  image: FormData | null;

  constructor(data: any, file: FormData) {
    this.title = data.title;
    this.body = data.body;
    this.image = file.has('file') ? file : null;
  }
}

