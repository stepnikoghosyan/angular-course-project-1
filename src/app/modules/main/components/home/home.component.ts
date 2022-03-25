import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, map, Observable, tap } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { AuthService } from '../../../auth/services/auth.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showSpinner = false
  posts$? : Observable<PostModel[]>

  constructor(private router: Router,
                private authService: AuthService,
                private postService :PostsService) { }

  ngOnInit(): void {
    this.showSpinner=true
    this.posts$ = this.postService.getPosts().pipe(
      map(data => data.results.slice(0,20)),
      finalize(()=>{
        this.showSpinner=false
      })    
      
    )
  }
  onLogOut(){
    this.authService.logout();
  }

}
