import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/modules/main/models/comment.model';

@Component({
    selector: 'app-comment-card',
    templateUrl: './comment-card.component.html',
    styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
    
    constructor() { }

    ngOnInit(): void {
    }

}
