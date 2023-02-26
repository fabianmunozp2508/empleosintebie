import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FeatherIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import {
  NgbDropdownModule,
  NgbDatepickerModule,
} from '@ng-bootstrap/ng-bootstrap';

// Ng-ApexCharts
import { NgApexchartsModule } from 'ng-apexcharts';

import { DashboardComponent } from './dashboard.component';
import { NumeroEmpleosComponent } from './numero-empleos/numero-empleos.component';
import { CantidaUsuariosComponent } from './cantida-usuarios/cantida-usuarios.component';
import { CantidaEmpresasComponent } from './cantida-empresas/cantida-empresas.component';
import { OfertasEmpleoComponent } from './ofertas-empleo/ofertas-empleo.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    NumeroEmpleosComponent,
    CantidaUsuariosComponent,
    CantidaEmpresasComponent,
    OfertasEmpleoComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    FeatherIconModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgApexchartsModule,
  ],
})
export class DashboardModule {}
