import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BackendService } from '../services/be/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailLogin?: any;
  passwordLogin?: string;

  usernameRegister?: any;
  emailRegister?: any;
  passwordRegister?: string;

  constructor(private backendService: BackendService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.backendService.login(this.emailLogin, this.passwordLogin).subscribe(token => {
      this.cookie.set("token", token);
      this.router.navigate(['/home']);
    });
  }
  register() {
    this.backendService.register(this.usernameRegister, this.emailRegister, this.passwordRegister).subscribe(token => {
      this.cookie.set('token', token);
      this.router.navigate(['/home']);
    });
  }

}
