import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/bookService/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  book: Object;

  bookForm = new FormGroup({
    title : new FormControl("", Validators.required),
    isbn : new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]),
    pageCount : new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]),
    publishedDate : new FormControl(""),
    shortDescription : new FormControl(""),
    authors : new FormControl("", Validators.required),
    categories : new FormControl("") 
  });

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
  }

  add(){
    const book = this.bookForm.value;
    this.bookService.addBook(book);
  }
}
