import {Component, OnInit} from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  pageName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('Page Not Found • Events');
  }

  ngOnInit(): void {
    this.pageName = this.authService.isAuthenticated() ? 'Events' : 'Login';
  }

  goTo() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    } else {
      if (this.authService.isAdmin()) {
        this.router.navigate(['events-table']);
      } else {
        this.router.navigate(['events-grid']);
      }
    }
  }
}
