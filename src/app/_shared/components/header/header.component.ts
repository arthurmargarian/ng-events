import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../_services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fullName: string;

  constructor(private authService: AuthService, private router: Router) {
    this.fullName = localStorage.getItem('fullName');
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
