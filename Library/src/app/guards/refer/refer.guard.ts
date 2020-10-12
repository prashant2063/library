import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/bookService/book.service';

@Injectable({
  providedIn: 'root'
})
export class ReferGuard implements CanActivate {

  constructor(private router: Router, private bookService: BookService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.bookService.getBook()){
        return true;
      }
      else{
        this.router.navigateByUrl("/books");
        return false;
      }
  }
  
}
