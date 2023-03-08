import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/interfaces/job.interfaces';
import { RegisterFormCompanyService } from '../../general/company/register-form-company.service';


@Component({
  selector: 'app-apexcharts',
  templateUrl: './apexcharts.component.html',
  styleUrls: ['./apexcharts.component.scss']
})
export class ApexchartsComponent implements OnInit {

  jobOffers: Job[] = [];

  constructor(private registerFormCompanyService: RegisterFormCompanyService) {}

  ngOnInit(): void {
    this.getJobOffers();

  }
  getJobOffers() {
    this.registerFormCompanyService.getJobOffersByUser().subscribe((jobOffers) => {
      this.jobOffers = jobOffers;
      console.log("Estas son tus ofertas ",this.jobOffers); // Aquí se muestran los datos en la consola
    });
  }

}
