import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  username: String;
  blogList: any;
  dataAvailable: Boolean = false;
  email: String;
  name: String;

  constructor(
    private authService: AuthService,
    private blogService:  BlogService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.username = params['username'];
      const user = {
        username: this.username,
      }
      this.authService.authProfile(user).subscribe(
        data => {
          this.email = data.email;
          this.name = data.name;
          this.blogService.getBlogByUsername(user).subscribe(
            data => {
              this.blogList = data;
              this.dataAvailable = true;
            },
            err => {
              this.blogService.handleError(err);
            });
        },
        err => {
          this.authService.handleError(err);
        });
    });
  }

}
