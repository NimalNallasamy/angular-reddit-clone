import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommentsPayload } from './comment.payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient : HttpClient) { }

  getAllCommentsForPost(postId: number) : Observable<CommentsPayload[]>{
    return this.httpClient.get<CommentsPayload[]>('http://localhost:8080/api/comments/post/'+postId);
  }

  postComment(CommentsPayload : CommentsPayload) : Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/api/comments', CommentsPayload);
  }

  getAllCommentsByUser(userName : string) : Observable<CommentsPayload[]>{
    return this.httpClient.get<CommentsPayload[]>('http://localhost:8080/api/comments/user/'+userName);
  }

}
