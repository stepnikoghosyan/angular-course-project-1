import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { PostModel, PostModelDto } from '../models/post.model';
import { NotificationService } from '../services/notification.service';
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
    targetValue!: string | null;
    isClicked = true;
    isHidden = false;
    showSpinner = false;


    updateForm: FormGroup = this.formBuilder.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        imageUrl: [''],
        updatedAt: [this.date]
    })

    constructor(private formBuilder: FormBuilder,
                private postService: PostsService,
                private activatedRoute: ActivatedRoute,
                private notifyService: NotificationService) { }

    ngOnInit(): void {
        this.showSpinner = true;
        let id = this.activatedRoute.snapshot.params['id'];
        this.postService.getPost(id)
        .pipe(
            finalize(()=>
                this.showSpinner = false
            )
        )
        .subscribe({
            next: (data)=>{
                console.log("POST DATA", data);
                this.post = data;
                this.targetValue = this.post?.imageUrl
                // this.updateForm.controls[''] = this.post?.title
            }
        })
    }
    
    updateFormSubmit(){
        const dto = new PostModelDto(this.updateForm.value);
        console.log("postDto", dto);
        console.log("PostID", this.post.id);
        console.log("post valid", this.updateForm.valid );
        if(this.updateForm.valid){
            this.showSpinner = true;
            this.postService.putPost(this.post.id, dto)
            .pipe(
                finalize(()=>  
                     this.showSpinner = false )
            )
            .subscribe({
                
                error: (err: HttpErrorResponse)=>{
                    console.log('ERROR MESSAGE', err.error.message);
                }
            })
        }else{
            console.log('Form invalid');
            this.notifyService.error( "", "No changes")
        }
    }

    selectFile(event: any){
        this.targetValue = event.target.files[0].name;
        if(this.targetValue){
            this.isHidden = true;
        }
    }

    removeFile(){
        this.targetValue = "";
        this.isHidden = false;
    }
}
