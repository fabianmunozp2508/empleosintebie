import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/interfaces/offer.interfaces';
import { OfferServiceService } from 'src/app/services/offer-service.service';
import { UserService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  jobOffers: JobOffer[];
  userId: string;

  constructor(
    private offerService: OfferServiceService,
    private userService: UserService,
  ) {}

  async ngOnInit() {
    const isUserAuthenticated = await this.userService.isAuthenticated();
    if (isUserAuthenticated) {
      const currentUser = await this.userService.getCurrentUser();
      this.userId = currentUser.uid;
    }
    this.offerService.getJobOffers().subscribe(jobOffers => {
      this.jobOffers = jobOffers;
    });
  }

  async applyJobOffer(jobOfferId: string) {
    const isUserAuthenticated = await this.userService.isAuthenticated();
    if (!isUserAuthenticated) {
      // El usuario no está autenticado, mostrar un mensaje de error.
      Swal.fire('Error', 'Debes estar autenticado para aplicar a una oferta', 'error');
      return;
    }

    const currentUser = await this.userService.getCurrentUser();
    const userId = currentUser.uid;

    this.offerService.applyJobOffer(jobOfferId, userId).then(() => {
      // La oferta fue aplicada exitosamente, mostrar un mensaje de éxito.
      Swal.fire('Éxito', 'La oferta fue aplicada exitosamente', 'success');
    }).catch((error) => {
      // Ocurrió un error al aplicar la oferta, mostrar un mensaje de error.
      Swal.fire('Error', `No se pudo aplicar la oferta: ${error.message}`, 'error');
    });
  }
}
