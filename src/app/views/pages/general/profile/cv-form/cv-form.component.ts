import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { CvProfiles } from 'src/app/interfaces/cv.interfaces';
import { CvProfileService } from 'src/app/services/cv-profile.service';
import { UserService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cv-form',
  templateUrl: './cv-form.component.html',
  styleUrls: ['./cv-form.component.scss'],
})
export class CvFormComponent implements OnInit {
  edit = false;
  subscriptions: Subscription;
  formGroup: FormGroup;
  cvprofile: CvProfiles[] = [];
  userId: string;
  constructor(
    private formBuilder: FormBuilder,
    private cvProfileService: CvProfileService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.ngoctener();
    this.userService.userId$.pipe(take(1)).subscribe(userId => {
      this.userId = userId;
      console.log('userId', userId);
    });
    this.formGroup = this.formBuilder.group({
      userId: [this.userId],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      direccion: ['', [Validators.required]],
      objetivo: ['', [Validators.required]],
      educacion: ['', [Validators.required]],
      experiencia: ['', [Validators.required]],
      habilidades: ['', [Validators.required]],
      rol: ['no estudiante']

    });

  }

  disableForm() {
    this.formGroup.get('name').disable();
    this.formGroup.get('email').disable();
    this.formGroup.get('telefono').disable();
    this.formGroup.get('direccion').disable();
    this.formGroup.get('objetivo').disable();
    this.formGroup.get('educacion').disable();
    this.formGroup.get('experiencia').disable();
    this.formGroup.get('habilidades').disable();
  }

  ngoctener() {
    this.cvProfileService
      .getcvprofile()
      .subscribe((cvprofiles: CvProfiles[]) => {
        this.cvprofile = cvprofiles;

        // Asigna los valores a los campos del formulario
         this.cvprofile.forEach((cv: CvProfiles) => {
          this.formGroup.get('name').setValue(cv.name);
          this.formGroup.get('email').setValue(cv.email);
          this.formGroup.get('telefono').setValue(cv.telefono);
          this.formGroup.get('direccion').setValue(cv.direccion);
          this.formGroup.get('objetivo').setValue(cv.objetivo);
          this.formGroup.get('educacion').setValue(cv.educacion);
          this.formGroup.get('experiencia').setValue(cv.experiencia);
          this.formGroup.get('habilidades').setValue(cv.habilidades);
          this.formGroup.get('userId').setValue(cv.userId);
        });
      });
  }
  editForm() {
    this.edit = true;
    this.enableForm()
  }

  async updatecvprofile(formValue: CvProfiles) {
    const response = await this.cvProfileService
      .updatecvprofile(formValue)
      .then((response) => {
        Swal.fire('Su cv ha sido actualizada!', '', 'success');
      })
      .catch((error) => Swal.fire('Error al Actualizar', error, 'error'));
  }

async submitForm() {
    if (this.edit) {
      this.updatecvprofile(this.formGroup.value);
    } else {
      const response = await this.cvProfileService
        .addcvprofile(this.formGroup.value)
        .then((response) => {
          Swal.fire('Su cv ha sido creada!', '', 'success');
        })
        .catch((error) => Swal.fire('Error al crear', error, 'error'));
    }
    this.formGroup.reset();
    this.router.navigate(['/general/profile']);
  }


  enableForm() {
    this.formGroup.get('name').enable();
    this.formGroup.get('email').enable();
    this.formGroup.get('telefono').enable();
    this.formGroup.get('direccion').enable();
    this.formGroup.get('objetivo').enable();
    this.formGroup.get('educacion').enable();
    this.formGroup.get('experiencia').enable();
    this.formGroup.get('habilidades').enable();
  }
}
