import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {
  photoURL: string;
  displayName: string;
  email: string;
  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.photoURL = this.userService.usuario.photoURL;
    this.displayName = this.userService.usuario.displayName;
    this.email = this.userService.usuario.email;
  }

}
