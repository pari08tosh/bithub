import { Component, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  @Input() blogList: any;
  @Input() currentTag: String;
  @Input() currentPage: number;
  @Input() blogCount: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  prevPage() {
    if (this.currentTag === null) {
      this.router.navigate(['/blogs'], { queryParams: { pn: this.currentPage - 1 } });
    } else {
      this.router.navigate(['/blogs'], { queryParams: { tag: this.currentTag, pn: this.currentPage - 1} });
    }
    window.scrollTo(0,0);
  }

  nextPage() {
    if (this.currentTag === null) {
      this.router.navigate(['/blogs'], { queryParams: { pn: this.currentPage + 1 } })
    } else {
      this.router.navigate(['/blogs'], { queryParams: { tag: this.currentTag, pn: this.currentPage + 1} })
    }
    window.scrollTo(0,0);
  }

  prevBtn() {
    return {
      'btn': true,
      'btn-sm': true,
      'btn-primary': true,
      'disabled': !(this.currentPage > 0),
    }
  }

  nextBtn() {
    return {
      'btn': true,
      'btn-sm': true,
      'btn-primary': true,
      'disabled': !(this.currentPage < Math.floor(this.blogCount/10)),
    }
  }

}
