import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  myServerUrl: string;
  private user;

  constructor(private httpClient: HttpClient, private router: Router) { 
    this.myServerUrl = environment.myBaseServerUrl;
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  authenticate(cred){
    const myUrl = this.myServerUrl+"api/user/authenticate";
    this.httpClient.post(myUrl,cred)
    .subscribe(
      (data)=>{
        localStorage.setItem('user',JSON.stringify(data));
        this.user = data;
        this.router.navigateByUrl('/books');
      },
      (err)=>{
        // console.log(err);
      }
    );
  }

  getUser(){
    return this.user;
  }
}
