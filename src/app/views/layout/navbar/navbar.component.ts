import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  photoURL: string;
  displayName: string;
  email: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.photoURL = this.userService.usuario.photoURL;
    this.displayName = this.userService.usuario.displayName;
    this.email = this.userService.usuario.email;
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }
  
  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    this.userService.logout();
    localStorage.removeItem('isLoggedin');
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

}
