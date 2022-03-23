import { Component, OnInit, Input } from '@angular/core';
import { PostsModel } from 'src/app/models/posts.model';
import { faEye, faComment, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-card-footer',
  templateUrl: './card-footer.component.html',
  styleUrls: ['./card-footer.component.scss']
})
export class CardFooterComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  faComment = faComment;
  constructor(private postsService: PostsService) { }

  @Input() post!: PostsModel;

  editPost(id: number) {    
    return this.postsService.getPostById(id).subscribe((res) => {
      console.log(res);
      
    })
  }

  ngOnInit(): void {
  }

}
