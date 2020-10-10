import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myServerUrl: string;
  private token;
  
  constructor(private httpClient: HttpClient, private router: Router) { 
    this.myServerUrl = environment.myBaseServerUrl;
    this.token = localStorage.getItem('token');
  }

  authenticate(cred){
    const myUrl = this.myServerUrl+"api/user/authenticate";
    let headers = new HttpHeaders();
    headers = headers.append('cred',JSON.stringify(cred));
    this.httpClient.get(myUrl,{headers})
    .subscribe(
      (data)=>{
        this.token = data['token']
        localStorage.setItem('token', this.token);
        this.router.navigateByUrl('/books');
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  getToken(){
    return this.token;
  }

  setToken(token){
    this.token = token;
  }
}
