import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListingComponent } from './components/books-listing/books-listing.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { ReferGuard } from './guards/refer/refer.guard';

const routes: Routes = [
  {path: "books", component: BooksListingComponent, canActivate: [AuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [AuthGuard]},
  {path: "bookDetails", component: BookDetailsComponent, canActivate: [AuthGuard, ReferGuard]},
  {path: "editBook", component: EditBookComponent, canActivate: [AuthGuard, AdminGuard, ReferGuard]},
  {path: "addBook", component: AddBookComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "**", redirectTo: "/login", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
