import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubRedditResponse } from './subreddit-response';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private httpClient : HttpClient) { }

  getAllSubreddits() : Observable<Array<SubRedditResponse>>{
    return this.httpClient.get<Array<SubRedditResponse>>("http://localhost:8080/api/subReddit");
  }
}
