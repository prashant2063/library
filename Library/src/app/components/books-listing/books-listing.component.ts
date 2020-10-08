import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookService/book.service';

@Component({
  selector: 'app-books-listing',
  templateUrl: './books-listing.component.html',
  styleUrls: ['./books-listing.component.css']
})
export class BooksListingComponent implements OnInit {

  books;

  constructor(public bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBooks()
    .subscribe(
      (data)=>{
        console.log(data)
        this.books = data;
      },(err)=>{
        console.log(err);
      }
    );
  }
}
