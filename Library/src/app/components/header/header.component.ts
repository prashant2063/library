import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: Object;

  constructor(private authService: AuthService, public router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getToken();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/")
  }
}
