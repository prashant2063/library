import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/bookService/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

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

  constructor(private bookService: BookService) { 
    this.book = this.bookService.getBook();
    this.bookForm.setValue({
      title : this.book['title'] || null,
      isbn : this.book['isbn'] || null,
      pageCount : this.book['pageCount'] || null,
      publishedDate : formatDate(this.book['publishedDate'],'yyyy-MM-dd','en-US') || null,
      shortDescription : this.book['shortDescription'] || null,
      authors : this.book['authors'].toString() || null,
      categories : this.book['categories'].toString() || null
    });
  }

  ngOnInit(): void {
  }

  update(){
    const book = this.bookForm.value;
    book['_id'] = this.book['_id'];
    this.bookService.updateBook(book);
  }

}
