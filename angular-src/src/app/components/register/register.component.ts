import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  password: String;
  email: String;

  constructor(
    private validateService: ValidateService,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  submitRegisterForm() {

    const user = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email,
    }

    // Validate Email
    if(!this.validateService.validateEmail(this.email)) {
      this.flashMessagesService.show('Enter Valid Email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register User

    this.authService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }

}
