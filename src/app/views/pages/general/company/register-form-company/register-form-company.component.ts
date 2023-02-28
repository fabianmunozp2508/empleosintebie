import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UserService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { RegisterFormCompanyService } from '../register-form-company.service';

const EMAIL_PROVIDERS = ['gmail.com', 'yahoo.com', 'hotmail.com'];

@Component({
  selector: 'app-register-form-company',
  templateUrl: './register-form-company.component.html',
  styleUrls: ['./register-form-company.component.scss'],
})
export class RegisterFormCompanyComponent implements OnInit {
  contactForm: FormGroup;
  logoFile: File;
  invalidDomains: string[] = ['gmail.com', 'hotmail.com', 'yahoo.com'];
  constructor(
    private fb: FormBuilder,
    private companyService: RegisterFormCompanyService,
    private router: Router,
    private userService: UserService,

    private route: ActivatedRoute,
    private rolesService: RolesService,
    formBuilder: FormBuilder
  ) {
    this.contactForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      nic: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        this.invalidEmailProvider.bind(this),
      ]),
      phone: new FormControl('', [Validators.required]),
      logo: new FormControl('', [Validators.required]),
      contactInfo: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {}

  invalidEmailProvider(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.value;

    if (email) {
      const invalidDomains = this.invalidDomains;
      if (invalidDomains && invalidDomains.some(domain => email.endsWith(domain))) {
        return { 'invalidEmailProvider': true };
      }
    }

    return null;
  }



  handleLogoChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => {
        if (image.width <= 500 && image.height <= 500) {
          this.logoFile = file;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El tamaño máximo permitido para el logo es 500px x 500px',
          });
        }
      };
      image.src = e.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeLogo() {
    this.logoFile = null;
  }


  async assignRole(): Promise<void> {
    const currentUser = await this.userService.getCurrentUser();
    // Verifica si el usuario ya tiene un rol asignado
    const userRole = await this.rolesService.getRoleByUserId(currentUser.uid);
    if (!userRole) {
      // Asigna el rol de "Aspirante" si el usuario aún no tiene un rol asignado
      const role = 'Aspirante';
      await this.rolesService.assignRole(currentUser.uid, role);
    }
  }

  async onSubmit() {
    if ( this.logoFile) {
      const companyForm = this.contactForm.value;
      await this.companyService.addcompanyForm(companyForm, this.logoFile);
      const currentUser = await this.userService.getCurrentUser();
      const userRole = await this.rolesService.getRoleByUserId(currentUser.uid);
      if (userRole && userRole.role === 'Aspirante') {
        await this.rolesService.assignRole(currentUser.uid, 'Empresa');
      }
      this.contactForm.reset();
      this.logoFile = null;
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El formulario se ha enviado correctamente',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos',
      });
    }
  }

}
