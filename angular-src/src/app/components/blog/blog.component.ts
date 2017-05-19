import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogId: String;
  currentBlog: any = [];
  editable: Boolean;
  username: String;
  commentList: any;
  commentBody: String;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private authService: AuthService,
    private flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.blogId = params['id'];

      const blog = {
        id: this.blogId,
      }

      const comment = {
        for: "blog",
        id: this.blogId,
      }

      this.blogService.getBlogById(blog).subscribe(data => {
        this.currentBlog = data;
        this.username = JSON.parse(localStorage.getItem('user')).username;
        if (this.username === this.currentBlog.username) {
          this.editable = true;
        } else {
          this.editable = false;
        }
      },
      err => {
        this.blogService.handleError(err);
      },
    );
      this.commentService.searchComments(comment).subscribe(data => {
        this.commentList = data;
      },
      err => {
        this.blogService.handleError(err);
      },
    );
    });
  }

  addComment() {
    const newComment = {
      for: "blog",
      id: this.blogId,
      username: this.username,
      body: this.commentBody,
      date: Date.now(),
    };
    this.commentBody = "";
    this.commentList.unshift(newComment);

    this.commentService.addComment(newComment).subscribe(data => {
      if (data.success) {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 1500 });
      } else {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
      }
      this.router.navigate(['/blog'], { queryParams: { id: this.blogId }});
    },
    err => {
      this.blogService.handleError(err);
    },
  );
  }

}
