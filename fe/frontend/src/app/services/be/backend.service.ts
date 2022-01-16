import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book';

const jwtHelper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class BackendService {

  selectedBook?: Book;
  books?: Book[];

  constructor(private http: HttpClient, private cookie: CookieService) { }

  register(name: any, email: any, password: any): Observable<string> {
    return this.http.post<string>('http://localhost:5000/auth/register', { 'name': name, 'email': email, 'password': password });
  }
  login(email: any, password: any): Observable<string> {
    return this.http.post<string>('http://localhost:5000/auth/login', { 'email': email, 'password': password });
  }
  logout() {
    this.cookie.delete('token');
  }

  isAuthenticated(): boolean {
    if (this.cookie.check('token')) {
      let token = this.cookie.get('token');
      return !jwtHelper.isTokenExpired(token);
    }
    return false;
  }


  getBooks(userEmail: string): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:5000/books/' + userEmail);
  }

  addNewBook(title: any, author: any, numOfPages: any, dateFrom: any, dateTo: any, userId: any,): Observable<JSON> {
    return this.http.post<JSON>('http://localhost:5000/books/', {
      'title': title, 'author': author, 'numOfPages': numOfPages,
      'dateFrom': dateFrom, 'dateTo': dateTo, 'userId': userId
    });
  }
  updateBook(_id: any, title: any, author: any, numOfPages: any, dateFrom: any, dateTo: any, userId: any,): Observable<JSON> {
    return this.http.put<JSON>('http://localhost:5000/books/', {
      '_id': _id,
      'title': title, 'author': author, 'numOfPages': numOfPages,
      'dateFrom': dateFrom, 'dateTo': dateTo, 'userId': userId
    });
  }
  deleteBook(_id: any): Observable<JSON> {
    return this.http.delete<JSON>('http://localhost:5000/books/' + _id);
  }
}


