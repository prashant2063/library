import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormData = {
    username: "",
    password: ""
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.authenticate(this.loginFormData);
  }
}
