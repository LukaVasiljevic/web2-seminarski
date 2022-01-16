import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../services/be/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {
    this.backendService.logout();
    this.router.navigate(['/login']);
  }
}
