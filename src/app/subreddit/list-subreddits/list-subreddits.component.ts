import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../subreddit.service';
import { throwError } from 'rxjs';
import { SubRedditResponse } from '../subreddit-response';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

  subReddits : Array<SubRedditResponse>;
  
  constructor(private subRedditService : SubredditService) { }

  ngOnInit(): void {
    this.subRedditService.getAllSubreddits().subscribe(
     (data) => {
       console.log(data);
       console.log("data");
       this.subReddits = data;
     },
     (error) => {
       console.log("error");
       console.log(error);
       throwError(error);
     }
    );
  }

}
