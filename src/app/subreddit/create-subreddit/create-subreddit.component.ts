import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { SubRedditResponse } from '../subreddit-response';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.css']
})
export class CreateSubredditComponent implements OnInit {

  createSubredditForm : FormGroup;
  subRedditModel : SubRedditResponse;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private router : Router, private subRedditService : SubredditService) {
    this.createSubredditForm = new FormGroup({
      title : new FormControl('',Validators.required),
      description : new FormControl('', Validators.required) 
    });

    this.subRedditModel = {
      name : '',
      description : ''
    }
  }

  ngOnInit(): void {
  }

  createSubreddit(){
    this.subRedditModel.name = this.createSubredditForm.get('title').value;
    this.subRedditModel.description = this.createSubredditForm.get('description').value;
    this.subRedditService.createSubReddit(this.subRedditModel).subscribe( (data) => {
      this.router.navigateByUrl("/list-subreddits");
    },
    error => {
      console.log('Error Occured');
      throwError(error);
    })
  }

  discard(){
    this.router.navigateByUrl('/')
  }



}
