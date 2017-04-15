import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  usernameEntered: Boolean;
  username: String;
  answer: String;
  securityQuestion: String;
  password: String;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.usernameEntered = false;
  }

  submitUsernameForm() {
    const user = {
      username: this.username,
    }
    this.authService.authUsername(user).subscribe(data => {
      if(data.success) {
        this.securityQuestion = data.securityQuestion;
        this.usernameEntered = true;
      } else {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  submitAnswerForm() {
    const user = {
      username: this.username,
      password: this.password,
      answer: this.answer,
    }
    this.authService.changePassword(user).subscribe(data => {
      if (data.success) {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
      } else {
          this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/forgotPassword']);
      }
    })
  }


}
