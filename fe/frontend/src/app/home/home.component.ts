import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Book } from '../models/book';
import { BackendService } from '../services/be/backend.service';

const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BackendService, DatePipe]
})
export class HomeComponent implements OnInit {

  books?: Book[];

  selectedBook: any;

  userID: any;

  constructor(private backendService: BackendService, private router: Router, private cookieService: CookieService, private datePipe: DatePipe) {
    this.userID = jwtHelper.decodeToken(this.cookieService.get('token'))._id;
    this.selectedBook = new Book();
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshBooks();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.selectedBook = new Book();
    this.refreshBooks();
  }
  onSubmit(form: NgForm) {
    if (this.selectedBook._id == "") {
      this.backendService.addNewBook(this.selectedBook.title, this.selectedBook.author, this.selectedBook.numOfPages,
        this.selectedBook.dateFrom, this.selectedBook.dateTo, this.userID).subscribe((res) => {
          this.resetForm(form);
          this.refreshBooks();
        });
    }
    else {
      this.backendService.updateBook(this.selectedBook._id, this.selectedBook.title, this.selectedBook.author, this.selectedBook.numOfPages,
        this.selectedBook.dateFrom, this.selectedBook.dateTo, this.userID).subscribe((res) => {
          this.resetForm(form);
          this.refreshBooks();
        });
    }
  }

  onEdit(b: Book) {
    this.selectedBook = b;
  }

  onDelete(b: Book) {
    this.backendService.deleteBook(b._id).subscribe((res) => {
      this.refreshBooks();
    });
  }

  refreshBooks() {
    this.backendService.getBooks(this.userID).subscribe(books => {
      this.books = books;
      books.forEach(b => {
        b.dateFrom = this.datePipe.transform(b.dateFrom, 'yyyy-MM-dd')?.toString();
        b.dateTo = this.datePipe.transform(b.dateTo, 'yyyy-MM-dd')?.toString();
      });
    });
  }


}
