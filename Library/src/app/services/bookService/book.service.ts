import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  myServerUrl: String;

  constructor(public httpClient: HttpClient) {
    this.myServerUrl = environment.myBaseServerUrl;
  }

  getBooks(skip, limit){
    const myUrl = this.myServerUrl+"api/books/";
    return this.httpClient.get(myUrl,{params:{skip,limit}});
  }
}
