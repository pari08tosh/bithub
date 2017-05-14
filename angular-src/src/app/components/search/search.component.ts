import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  blogArray: any;
  currentPage: number;
  blogCount: number;
  prevBtnActive: Boolean = false;
  nextBtnActive: Boolean = false;
  searchString: String;

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
        console.log(this.blogCount);
        if (this.currentPage > 0) {
          this.prevBtnActive = true;
        } else {
          console.log('Yes')
          this.prevBtnActive = false;
        }

        if (this.currentPage < Math.floor(this.blogCount/10)) {
          this.nextBtnActive = true;
        } else {
          this.nextBtnActive = false;
        }
      });

      this.blogService.searchBlogs(blogInfo).subscribe(data => {
        this.blogArray = data;
      });
    });
   }


  prevPage() {
    this.router.navigate(['/blogs'], { queryParams: { search: this.searchString, pn: this.currentPage - 1} });
    window.scrollTo(0,0);
  }

  nextPage() {
    this.router.navigate(['/blogs'], { queryParams: { search: this.searchString, pn: this.currentPage + 1} })
    window.scrollTo(0,0);
  }

  prevBtn() {
    return {
      'btn': true,
      'btn-sm': true,
      'btn-primary': true,
      'disabled': !this.prevBtnActive,
    }
  }

  nextBtn() {
    return {
      'btn': true,
      'btn-sm': true,
      'btn-primary': true,
      'disabled': !this.nextBtnActive,
    }
  }

}
