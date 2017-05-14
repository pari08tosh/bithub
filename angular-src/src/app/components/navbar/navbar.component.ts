import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Object = [];
  login: String;
  searchString: String;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.login = params['login'];
      if (this.login) {
        this.user = this.authService.getUser();
      }
    });
    this.user = this.authService.getUser();
  }

  userLogout() {
    this.authService.userLogout();
    this.flashMessagesService.show(`Successfully Logged Out`, { cssClass: 'alert-success', timeout: 1500 });
    this.router.navigate(['/']);
  }

  search() {
    if (this.searchString === '') {
      return false;
    } else {
      this.router.navigate(['/search'], { queryParams: { search: this.searchString, pn: 0 }});
      this.searchString='';
    }
  }

}
