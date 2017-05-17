import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogList: any;
  currentTag: String;
  currentPage: number;
  blogCount: number;
  dataAvailable: Boolean = false;
  prevBtnActive: Boolean = false;
  nextBtnActive: Boolean = false;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
    this.currentPage = Number(params['pn']);
      this.currentTag = params['tag'];

      if (!this.currentTag) {
        this.currentTag = null;
      }

      const blogInfo = {
        tag: this.currentTag,
        pn: this.currentPage
      }

      this.blogService.getBlogCount(blogInfo).subscribe(data => {
        this.blogCount = Number(data.count);
      });

      this.blogService.getBlogs(blogInfo).subscribe(data => {
        this.blogList = data;
        this.dataAvailable = true;
      });
    });
   }
}
