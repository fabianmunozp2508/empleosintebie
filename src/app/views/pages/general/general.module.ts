import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherIconModule } from '../../../core/feather-icon/feather-icon.module';
import {
  NgbAccordionModule,
  NgbDropdownModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';

import { GeneralComponent } from './general.component';
import { BlankComponent } from './blank/blank.component';
import { FaqComponent } from './faq/faq.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { PricingComponent } from './pricing/pricing.component';
import { TimelineComponent } from './timeline/timeline.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderProfileComponent } from './profile/header-profile/header-profile.component';
import { CvComponent } from './profile/cv/cv.component';
import { CompanyComponent } from './profile/company/company.component';
import { ApplicationsComponent } from './profile/applications/applications.component';
import { CvFormComponent } from './profile/cv-form/cv-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterFormCompanyComponent } from './company/register-form-company/register-form-company.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { LayoutModule } from '../../layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: GeneralComponent,
    children: [
      {
        path: '',
        redirectTo: 'blank-page',
        pathMatch: 'full',
      },
      {
        path: 'blank-page',
        component: BlankComponent,
      },
      {
        path: 'faq',
        component: FaqComponent,
      },
      {
        path: 'invoice',
        component: InvoiceComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'pricing',
        component: PricingComponent,
      },
      {
        path: 'timeline',
        component: TimelineComponent,
      },
      {
        path: 'cvform',
        component: CvFormComponent,
      },
      // {
      //   path: 'buscador',
      //   component: BuscadorComponent,
      // },
      {
        path: 'registerCompany',
        component: RegisterFormCompanyComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    GeneralComponent,
    BlankComponent,
    FaqComponent,
    InvoiceComponent,
    ProfileComponent,
    PricingComponent,
    TimelineComponent,
    HeaderProfileComponent,
    CvComponent,
    CompanyComponent,
    ApplicationsComponent,
    CvFormComponent,
    RegisterFormCompanyComponent,
    BuscadorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeatherIconModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,

  ],
})
export class GeneralModule {}
