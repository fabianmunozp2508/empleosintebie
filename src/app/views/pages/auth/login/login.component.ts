import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  returnUrl: any;
  formGroup: FormGroup;
  formBuilder: FormBuilder;


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    formBuilder: FormBuilder
  ) {
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  async onLoggedin(event: Event) {
    event.preventDefault();
    if (!this.formGroup) {
      return;
    }

    try {
      const email = this.formGroup.get('email').value;
      const password = this.formGroup.get('password').value;

      if (!email || !password) {
        Swal.fire('Error', 'Debe ingresar su correo electrónico y contraseña.', 'error');
        return;
      }

      const result = await this.userService.login({
        email,
        password,
      });

      if (result) {
        localStorage.setItem('isLoggedin', 'true');
        this.router.navigate([this.returnUrl]);
      } else {
        Swal.fire('Error', 'Usuario no registrado o correo electrónico o contraseña incorrectos.', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error de autenticación. Por favor, intente más tarde.', 'error');
    }
  }

  async loginWithGoogle() {
    try {
      const result = await this.userService.loginWithGoogle();
      if (result) {
        const user = result.user;
        const email = user.email;
        const photoURL = user.photoURL;
        const displayName = user.displayName;
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('email', email);
        localStorage.setItem('photoURL', photoURL);
        localStorage.setItem('displayName', displayName);
        this.router.navigate(['/general/profile']);
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Ocurrió un error de autenticación con Google. Por favor, intente más tarde.', 'error');
    }
  }


}
