import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../shared/post-model'
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient : HttpClient) { }

  getAllPosts() : Observable<Array<PostModel>> {
    return this.httpClient.get<Array<PostModel>>('http://localhost:8080/api/posts');
  }

  getPost(postId : number) : Observable<PostModel>{
    return this.httpClient.get<PostModel>('http://localhost:8080/api/posts/'+postId);
  }

  createPost(postRequestPayload : CreatePostPayload) : Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/posts', postRequestPayload);
  }

  getAllPostsByUser(userName : string) : Observable<PostModel[]>{
    return this.httpClient.get<PostModel[]>('http://localhost:8080/api/posts/byUser/'+userName);
  }
}
