import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private myServerUrl: string;
  
  constructor(private httpClient: HttpClient, private router: Router) { 
    this.myServerUrl = environment.myBaseServerUrl;
  }

  authenticate(cred){
    const myUrl = this.myServerUrl+"api/user/authenticate";
    let headers = new HttpHeaders();
    headers = headers.append('cred',JSON.stringify(cred));
    this.httpClient.get(myUrl,{headers})
    .subscribe(
      (data)=>{
        localStorage.setItem('token', data['token']);
        this.router.navigateByUrl('/books');
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRole()
  {
    const user = jwt_decode(this.getToken());
    return user['role'];
  }
}
