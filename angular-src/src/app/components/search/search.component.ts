import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  blogList: any;
  currentPage: number;
  blogCount: number;
  searchString: String;
  dataAvailable: Boolean = false;

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
    this.currentPage = Number(params['pn']);
    this.searchString = params['search'];

      const blogInfo = {
        searchString: this.searchString,
        pn: this.currentPage,
      }

      this.blogService.getBlogCount(blogInfo).subscribe(data => {
        this.blogCount = Number(data.count);
      });

      this.blogService.searchBlogs(blogInfo).subscribe(data => {
        this.blogList = data;
        this.dataAvailable = true;
      });
    });
   }
}
