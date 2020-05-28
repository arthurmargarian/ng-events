import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private fullName: string;

  constructor(private authService: AuthService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    this.fullName = localStorage.getItem('fullName');
  }

  public openModal(content): void {
    this.modalService.open(content, {centered: true});
  }

  private logOut(): void {
    this.modalService.dismissAll();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
