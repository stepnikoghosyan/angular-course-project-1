import { Component, OnInit, Input } from '@angular/core';
import { PostsModel } from 'src/app/models/posts.model';
import { faEye, faComment, faEdit, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/users/users.service';
import { PostsModelDto } from 'src/app/models/post.model';
import { Router } from '@angular/router';
import { UserModelDto } from 'src/app/models/user.model';
import { forkJoin } from 'rxjs';

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
  // vuePost(id: number) {
  //   this.postsService.getPostById(id).subscribe((post) => {
  //     this.router.navigate(['post-view', post.id]);
  //   })
  // }

  ngOnInit(): void {

  }

}
