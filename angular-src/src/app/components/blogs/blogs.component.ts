import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogArray: any;
  currentTag: String;
  currentPage: number;
  blogCount: number;
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
      },
      err => {
        console.log(err);
      });

      this.blogService.getBlogs(blogInfo).subscribe(data => {
      this.blogArray = data;
    }, err => {
      console.log(err);
    });
    });
   }


  prevPage() {
    if (this.currentTag === null) {
      this.router.navigate(['/blogs'], { queryParams: { pn: this.currentPage - 1 } })
    } else {
      this.router.navigate(['/blogs'], { queryParams: { tag: this.currentTag, pn: this.currentPage - 1} })
    }
  }

  nextPage() {
    if (this.currentTag === null) {
      this.router.navigate(['/blogs'], { queryParams: { pn: this.currentPage + 1 } })
    } else {
      this.router.navigate(['/blogs'], { queryParams: { tag: this.currentTag, pn: this.currentPage + 1} })
    }
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
