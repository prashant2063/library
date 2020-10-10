import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  myServerUrl: String;
  book;

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    this.myServerUrl = environment.myBaseServerUrl;
  }

  getBooks(skip, limit){
    const myUrl = this.myServerUrl+"api/books/";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.authService.getToken());
    return this.httpClient.get(myUrl,{params:{skip,limit}, headers});
  }

  deleteBook(_id){
    const myUrl = this.myServerUrl+"api/books/deleteBook";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.authService.getToken());
    return this.httpClient.delete(myUrl,{params:{_id}, headers});
  }

  saveBook(book){
    this.book = book;
  }

  getBook(){
    return this.book;
  }
}
