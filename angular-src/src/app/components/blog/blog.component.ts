import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../../services/blog.service';

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

  constructor(
    private router: Router,
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.blogId = params['id'];

      const blog = {
        id: this.blogId,
      }

      this.blogService.getBlogById(blog).subscribe(data => {
        this.currentBlog = data;
        this.currentBlog.modifiedDate = this.currentBlog.modifiedDate.split('T')[0];
        this.username = JSON.parse(localStorage.getItem('user')).username;
        if (this.username === this.currentBlog.username) {
          this.editable = true;
        } else {
          this.editable = false;
        }
      })

    });


  }
}
