import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { faComments, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VoteService } from '../vote.service';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';
import { VotePayload } from './vote-payload';
import { VoteType } from './vote-type';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit {

  @Input() post : PostModel;
  votePayload : VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;

  constructor(private voteService : VoteService, private authService : AuthService, private postService : PostService, private toastrService : ToastrService) {
    this.votePayload = {
      voteType : undefined,
      postId : undefined
    }
  }

  ngOnInit(): void {
  }

  upVotePost(){
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
  }
  downVotePost(){
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
  }

  vote(){
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(
      (data) => {
        this.updateVoteDetails();
      },
      (error) => {
        throwError(error);
      }
    );
  }

  updateVoteDetails(){
    this.postService.getPost(this.post.id).subscribe(
      (data) => {
        this.post = data;
      }
    );
  }
}
