import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel, PostModelDto } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
    @ViewChild('file') el!: ElementRef;
    date = JSON.stringify(new Date());
    post!: PostModel;
    isClicked = true;

    updateForm: FormGroup = this.formBuilder.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        imageUrl: [''],
        updatedAt: [this.date]
    })

    constructor(private formBuilder: FormBuilder,
                private postService: PostsService,
                private activatedRoute: ActivatedRoute,
                private router: Router) { }

    ngOnInit(): void {
        let id = this.activatedRoute.snapshot.params['id'];
        this.postService.getPost(id).subscribe({
            next: (data)=>{
                console.log("POST DATA", data);
                this.post = data;
            }
        })
    }
    
    updateFormSubmit(){
    
        const dto = new PostModelDto(this.updateForm.value);
        console.log("postDto", dto);
        console.log("PostID", this.post.id);
        if(this.updateForm.valid){
            this.postService.putPost(this.post.id, dto).subscribe({
                next: ()=>{
                    this.router.navigateByUrl('/main/posts');
            
                },
                error: (err: HttpErrorResponse)=>{
                    console.log('ERROR MESSAGE', err.message);
                }
            })
        }
    }

    selectFile(){
        // this.el.nativeElement.click();
        // this.isClicked = true;
    }
}
