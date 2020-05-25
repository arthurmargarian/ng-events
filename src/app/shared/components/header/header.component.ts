import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private fullName: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName');
  }
  private logout():void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
