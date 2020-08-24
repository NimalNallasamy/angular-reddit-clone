import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreatePostPayload } from './create-post.payload';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { SubredditService } from 'src/app/subreddit/subreddit.service';
import { SubRedditResponse } from 'src/app/subreddit/subreddit-response';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm : FormGroup;
  postPayload : CreatePostPayload;
  subReddits : Array<SubRedditResponse>;

  constructor(private router : Router, private postService : PostService, private subRedditService : SubredditService) {
    this.postPayload = {
      postName : '',
      url : '',
      description : '',
      subRedditName : ''
    }
  }

  ngOnInit(): void {
    this.createPostForm = new FormGroup({
      postName : new FormControl('', Validators.required),
      url : new FormControl('', Validators.required),
      description : new FormControl('', Validators.required),
      subRedditName : new FormControl('', Validators.required)
    });

    this.subRedditService.getAllSubreddits().subscribe(
      (data) => {
        this.subReddits = data;
      },
      (error) => {
        throwError(error);
      });
  }

  createPost(){
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.description = this.createPostForm.get('description').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.subRedditName = this.createPostForm.get('subRedditName').value;


    this.postService.createPost(this.postPayload).subscribe(
      (data) => {
        this.router.navigateByUrl('/');
      },
      (error) => {
        throwError(error);
      }
    );
  }

  discardPost(){

  }

}
