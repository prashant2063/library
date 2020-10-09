import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/bookService/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book: Object;
  keys: Array<any>;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.book = this.bookService.getBook();
  }

}
