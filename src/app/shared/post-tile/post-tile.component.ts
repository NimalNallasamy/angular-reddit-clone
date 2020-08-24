import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { PostService } from '../post.service';
import { faComments, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts : PostModel[];

  constructor(private router : Router, private postService : PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
    })
  }

  ngOnInit(): void {
  }
  goToPost(postId : number){
    this.router.navigateByUrl('/view-post/'+postId);
  }

}
