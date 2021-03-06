import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../../services/blog.service';
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/paste';

declare var tinymce: any;

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})

export class EditBlogComponent implements OnInit {
  blogId: String;
  heading: String;
  body: String;
  tags: String[] = [];
  tag: string;
  initialContent: String;
  deleteBtnText: String;

  constructor(
    private blogService: BlogService,
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.deleteBtnText = "Delete Blog";
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.blogId = params['id'];
      const blog = {
        id: this.blogId,
      }
      this.blogService.getBlogById(blog).subscribe(
        data => {
          this.heading = data.heading;
          this.initialContent = data.body;
          this.body = data.body;
          this.tags = data.tags;
        },
        err => {
          this.blogService.handleError(err);
      });
    });
  }

  tinyResponce(tinyBody: String) {
    this.body = tinyBody;
  }

  addTag() {
    this.tags.push(this.tag);
    this.tag = '';
  }

  removeTag(tag) {
    for(let ii = 0; ii < this.tags.length; ii++) {
      if (this.tags[ii] === tag) {
        this.tags.splice(ii, 1);
        break;
      }
    }
  }

  submitBlog() {
    const blog = {
      id: this.blogId,
      heading: this.heading,
      body: this.body,
      tags: this.tags,
    }
    this.blogService.editBlog(blog).subscribe(
      data => {
        if (data.success) {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 1500 });
          this.router.navigate(['/blogs'], { queryParams: { pn: 0 }});
        } else {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
          this.router.navigate(['/editBlog'], { queryParams: { id: this.blogId }});
        }
      },
      err => {
        this.blogService.handleError(err);
      });
  }

  deleteBlog() {
    if (this.deleteBtnText === "Delete Blog") {
      this.deleteBtnText = "Click again to confirm";
      return false;
    } else {
      const blog = {
        id: this.blogId,
      }
      this.blogService.deleteBlog(blog).subscribe(
        data => {
          if(data.success) {
            this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 1500 });
            this.router.navigate(['/blogs'], { queryParams: { pn: 0 }});
          } else {
              this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 1500 });
              this.router.navigate(['/editBlog'], { queryParams: { id: this.blogId }});
          }
        },
        err => {
          this.blogService.handleError(err);
        });
    }
  }

}
