import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  myServerUrl: String;
  book;

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    this.myServerUrl = environment.myBaseServerUrl;
  }

  getBooks(skip, limit){
    const myUrl = this.myServerUrl+"api/books/";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.authService.getToken());
    return this.httpClient.get(myUrl,{params:{skip,limit}, headers});
  }

  saveBook(book){
    this.book = book;
  }

  getBook(){
    return this.book;
  }
}
