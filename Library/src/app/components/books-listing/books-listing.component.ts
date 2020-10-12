import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookService } from 'src/app/services/bookService/book.service';

@Component({
  selector: 'app-books-listing',
  templateUrl: './books-listing.component.html',
  styleUrls: ['./books-listing.component.css']
})
export class BooksListingComponent implements OnInit {
  page: number;
  entriesInPage: number;
  books;
  isAdmin: boolean;

  constructor(private bookService: BookService, private router: Router, private authSevice: AuthService) {
    this.isAdmin = (this.authSevice.getRole() == "admin")?true:false;
  }

  ngOnInit(): void {
    this.page = 0;
    this.entriesInPage = 15;

    this.getBooks(0, this.entriesInPage);
  }

  nextBtnClickHandler(){
    this.page+=1;
    this.getBooks(this.page*this.entriesInPage, this.entriesInPage);
  }

  previousBtnCLickHandler(){
    this.page-=1;
    this.getBooks(this.page*this.entriesInPage, this.entriesInPage);
  }

  getBooks(skip, limit){
    this.bookService.getBooks(skip, limit)
    .subscribe(
      (data)=>{
        this.books = data;
      },(err)=>{
        console.log(err);
      }
    );
  }

  saveBook(book){
    this.bookService.saveBook(book);
    this.router.navigateByUrl("/bookDetails");
  }

  editBook(book){
    this.bookService.saveBook(book);
    this.router.navigateByUrl("/editBook")
    return;
  }

  deleteBook(_id){
    this.bookService.deleteBook(_id)
    .subscribe(
      (data)=>{
        const pos = this.books.findIndex((book)=> book._id == data['value']['_id']);
        if(pos >= 0){
          this.books.splice(pos,1);
        }
      },
      (err)=>{
        console.log(err);
      }
    );
  }
}
