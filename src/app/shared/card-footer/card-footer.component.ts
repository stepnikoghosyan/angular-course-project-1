import { Component, OnInit, Input } from '@angular/core';
import { PostsModel } from 'src/app/models/posts.model';
import { faEye, faComment, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/users/users.service';
import { PostsModelDto } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/posts/posts.service';


@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faComment = faComment;
  myId!: number;

  postModel = new PostsModelDto({});
  constructor(private postsService: PostsService,
    public userService: UsersService,
    private router: Router
  ) { }

  @Input() post!: PostsModel;

  editPost(id: number) {
    this.postsService.getPostById(id).subscribe((post) => {
      this.router.navigate(['posts', post.id]);
    })
  }

  ngOnInit(): void {

  }

}
