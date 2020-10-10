import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  private myServerUrl: String;
  private book: Object;

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) {
    this.myServerUrl = environment.myBaseServerUrl;
  }

  getBooks(skip, limit){
    const myUrl = this.myServerUrl+"api/books/get";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.authService.getToken());
    return this.httpClient.get(myUrl,{params:{skip,limit}, headers});
  }

  deleteBook(_id){
    const myUrl = this.myServerUrl+"api/books/delete";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.authService.getToken());
    return this.httpClient.delete(myUrl,{params:{_id}, headers});
  }

  updateBook(book){
    const myUrl = this.myServerUrl+"api/books/update";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.authService.getToken());
    this.httpClient.put(myUrl,book,{headers})
    .subscribe(
      (data)=>{
        this.router.navigateByUrl("/books");
      },(err)=>{
        console.log(err);
      }
    );
  }

  addBook(book){
    const myUrl = this.myServerUrl+"api/books/add";
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer '+this.authService.getToken());
    this.httpClient.post(myUrl, book, {headers})
    .subscribe(
      (data)=>{
        this.router.navigateByUrl("/books");
      },(err)=>{
        console.log(err);
      }
    );
  }

  saveBook(book){
    this.book = book;
  }

  getBook(){
    return this.book;
  }
}
