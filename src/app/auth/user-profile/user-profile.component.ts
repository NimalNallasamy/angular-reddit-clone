import { Component, OnInit, Input } from '@angular/core';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostModel } from 'src/app/shared/post-model';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { throwError } from 'rxjs';
import { CommentsPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {

 name : string;
 posts : PostModel[];
 comments : CommentsPayload[];
 postLength : number;
 commentLength : number;

  constructor(private activatedRoute : ActivatedRoute, private postService : PostService, private commentService : CommentService) {

    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(
      (data) => {
        this.posts = data;
        this.postLength = data.length;
      },
      (error) => {
        throwError(error);
      }
    );

    this.commentService.getAllCommentsByUser(this.name).subscribe(
      (data) => {
        this.comments = data;
        this.commentLength = data.length;
      },
      (error) => {

      }
    );
  }

  ngOnInit(): void {
  }

}
