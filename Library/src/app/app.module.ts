import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BooksListingComponent } from './components/books-listing/books-listing.component';
import { LoginComponent } from './components/login/login.component';

import { BookService } from './services/bookService/book.service';
import { AuthService } from './services/auth/auth.service';
import { AdminGuard } from './guards/admin/admin.guard'
import { AuthGuard } from './guards/auth/auth.guard'
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksListingComponent,
    LoginComponent,
    BookDetailsComponent,
    EditBookComponent,
    AddBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService,
    AuthService,
    AdminGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
