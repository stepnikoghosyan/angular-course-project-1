import {Component, Input, OnInit} from "@angular/core";
import { PostModel } from "../models/post.model";

@Component({
  selector: 'app-post-card-footer',
  templateUrl: './post-card-footer.component.html',
  styleUrls: ['post-card-footer.component.scss']
})
export class PostCardFooterComponent implements OnInit {
  @Input() post!: PostModel;
    
    ngOnInit(): void {
        console.log(222,this.post)
    }

}
