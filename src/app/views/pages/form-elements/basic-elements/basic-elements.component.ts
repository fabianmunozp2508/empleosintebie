import { Component, OnInit } from '@angular/core';
import { CompanyForm } from 'src/app/interfaces/company';
import { RegisterFormCompanyService } from '../../general/company/register-form-company.service';


@Component({
  selector: 'app-basic-elements',
  templateUrl: './basic-elements.component.html',
  styleUrls: ['./basic-elements.component.scss']
})
export class BasicElementsComponent implements OnInit {
  companyForm: CompanyForm;
  showEditButton = false;

  constructor(private registerFormCompanyService: RegisterFormCompanyService) { }

  ngOnInit(): void {
    this.registerFormCompanyService.getcompanyForm().subscribe(forms => {
      if (forms.length > 0) {
        this.companyForm = forms[0];
        console.log(this.companyForm);
        this.showEditButton = true;
      }
    });
  }

}
