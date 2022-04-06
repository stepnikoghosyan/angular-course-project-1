import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { debounceTime, finalize, map, Observable, of, takeUntil, tap } from 'rxjs';
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
    posts!: PostModel[];
    showSpinner = false;
    users: GetUserModel[] = [];
    me?: GetUserModel;
    itemsPerPage = 9;
    currentPage = 1;


    filterForm = this.formBuilder.group({
        searchByTitle: [''],
        searchByAuthor: ['']
    })

    constructor(private postService: PostsService,
        private usersService: UsersService,
        private config: NgSelectConfig,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.showSpinner = true;
        this.posts$ = this.postService.getPosts().pipe(
            finalize(() => {
                this.showSpinner = false;
            }),
            map(data=> data.results))

        this.myProfileInfo = this.usersService.myProfile;
        this.usersService.getUsers().subscribe({
            next: (data) => {
                this.users = data.results;
                console.log("getting users in posts", data.results);
            }
        })
        this.filterForm.controls['searchByTitle'].valueChanges.pipe(
            debounceTime(300),
            finalize(()=> this.showSpinner = false))
            .subscribe({
                next: () => {
                    this.posts$ = this.postService.getPosts(this.filterForm.controls['searchByTitle'].value).pipe(
                        map(data =>  this.posts = data.results)
                    )
                }
            })
        };

    searchByAuthor(value?: string) {

        if (this.posts && value) {
            console.log("search value", value, value);
            return this.posts$ = of(this.posts.filter((post) => post.user.firstName == value))
        } else {
            return this.posts$;
        }
    }

    onChangePage(event: number) {
        this.currentPage = event;
    }
}
