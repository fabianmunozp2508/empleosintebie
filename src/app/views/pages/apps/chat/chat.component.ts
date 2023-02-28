import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { JobOffer } from 'src/app/interfaces/offer.interfaces';
import { OfferServiceService } from 'src/app/services/offer-service.service';
import { UserService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  userId: string;
  defaultNavActiveId = 1;
  jobOffers$: Observable<JobOffer[]>;

  constructor(private auth: UserService, private offerService: OfferServiceService) { }

  ngOnInit(): void {
    this.auth.userId$.subscribe(userId => {
      if (userId) {
        this.userId = userId;
        this.offerService.setUserId(userId);
        this.jobOffers$ = this.offerService.getApplicantJobOffers();
      }
    });
  }

  ngAfterViewInit(): void {

  }

  deleteApplicantJobOffer(jobOfferId: string) {
    this.offerService.deleteApplicantJobOffer(jobOfferId);
  }


}



