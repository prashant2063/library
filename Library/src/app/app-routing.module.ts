import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListingComponent } from './components/books-listing/books-listing.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: "books", component: BooksListingComponent},
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: "/books", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
