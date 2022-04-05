import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { debounceTime, finalize, map, Observable, of } from 'rxjs';
import { PostModel } from '../../models/post.model';
import { GetUserModel } from '../../models/user.model';
import { PostsService } from '../../services/posts.service';
import { UsersService } from '../../services/users.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    myProfileInfo?: GetUserModel;
    posts$?: Observable<PostModel[]>;
    posts?: PostModel[];
    showSpinner = false;
    users: GetUserModel[] = [];
    me?: GetUserModel;

    filterForm = this.formBuilder.group({
        searchByTitle: [''],
        searchByAuthor: ['']
    })

    constructor(private postService: PostsService,
        private usersService: UsersService, 
        private config: NgSelectConfig,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.showSpinner = true;
        this.posts$ = this.postService.getPosts().pipe(
            finalize(() => {
                this.showSpinner = false;
            }),
            map(data => this.posts = data.results),
        ),
            this.myProfileInfo = this.usersService.myProfile;
        this.usersService.getUsers().subscribe({
            next: (data) => {
                this.users = data.results;
                console.log("getting users in posts", data.results);
            }
        })
        this.filterForm.controls['searchByTitle'].valueChanges.pipe(
            debounceTime(300)).subscribe({
                next: () => {
                    this.posts$ = this.postService.getPosts(this.filterForm.controls['searchByTitle'].value).pipe(
                        map(data => data.results)
                    )
                }
            })
    };

    searchByAuthor(value?: string) {

        if (this.posts && value) {
            console.log("search value", value, value);
            return this.posts$ = of(this.posts.filter((post) => post.user.firstName == value))
        }else{
            return this.posts$;
        }
    }
}
