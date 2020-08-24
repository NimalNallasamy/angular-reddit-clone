import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { PostModel } from 'src/app/shared/post-model';
import { CommentsPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId : number;
  post : PostModel;
  commentForm : FormGroup;
  commentPayload : CommentsPayload;
  comments : CommentsPayload[];

  constructor(private postService : PostService, private activatedRoute : ActivatedRoute,private commentService: CommentService) {
    this.postId = this.activatedRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text : new FormControl('', Validators.required)
    });

    this.commentPayload = {
      text : '',
      postId : this.postId
    }

    this.postService.getPost(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  private getPostById(){
    this.postService.getPost(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  postComment(){
    this.commentPayload.text = this.commentForm.get('text').value;
    this.commentService.postComment(this.commentPayload).subscribe(
      (data) => {
        this.commentForm.get('text').setValue('');
        this.getCommentsForPost();
      }
    );

  }

  getCommentsForPost(){
      this.commentService.getAllCommentsForPost(this.postId).subscribe(
        (data) => {
          this.comments = data;
        },
        (error) => {
          throwError(error);
        }
      );
  }

}
