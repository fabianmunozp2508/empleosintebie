import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyForm } from 'src/app/interfaces/company';
import { Job } from 'src/app/interfaces/job.interfaces';
import { UserService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { RegisterFormCompanyService } from '../../general/company/register-form-company.service';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss'],
})
export class FormValidationComponent implements OnInit {
  edit = false;
  subscriptions: Subscription;
  formGroup: FormGroup;
  jobform: Job[] = [];
  userId: string;

  submitted: boolean = false;
  companyForm: CompanyForm;
  constructor(
    private formBuilder: FormBuilder,
    private registerFormCompanyService: RegisterFormCompanyService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerFormCompanyService.getcompanyForm().subscribe((forms) => {
      if (forms.length > 0) {
        this.companyForm = forms[0];
      }
    });
    this.formGroup = this.formBuilder.group({
      userId: [this.userId],
      logo: ['',[Validators.required]],
      name: ['',[Validators.required]],
      descriptionCompany: ['',[Validators.required]],
      position: ['', [Validators.required, Validators.minLength(3)]],
      department: ['', [Validators.required]],
      location: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      description: ['', [Validators.required, Validators.minLength(3),  Validators.maxLength(250)]],
      applicants: [''],
    });
  }

  async updatejobOffer(formValue: Job) {
    const response = await this.registerFormCompanyService
      .updatejobOffer(formValue)
      .then((response) => {
        Swal.fire('Su cv ha sido actualizada!', '', 'success');
      })
      .catch((error) => Swal.fire('Error al Actualizar', error, 'error'));
  }
  async onSubmit() {
    if (this.edit) {
      this.updatejobOffer(this.formGroup.value);
    } else {
      const jobOffer = { ...this.formGroup.value, ...this.companyForm };
      const response = await this.registerFormCompanyService
        .addJob(jobOffer)
        .then((response) => {
          Swal.fire('Su cv ha sido creada!', '', 'success');
        })
        .catch((error) => Swal.fire('Error al crear', error, 'error'));
    }
    this.formGroup.reset();
    this.router.navigate(['/dashboard']);
  }

}
