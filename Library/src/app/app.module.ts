import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BooksListingComponent } from './components/books-listing/books-listing.component';
import { LoginComponent } from './components/login/login.component';

import { BookService } from './services/bookService/book.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksListingComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
