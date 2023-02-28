import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobOffer } from '../interfaces/offer.interfaces';
import firebase from 'firebase/compat/app';
import { addDoc, collection } from 'firebase/firestore';
import { UserService } from './usuario.service';

@Injectable({
  providedIn: 'root',
})
export class OfferServiceService {
  private jobOffersCollection: AngularFirestoreCollection<JobOffer>;
  private jobOffers$: Observable<JobOffer[]>;
  private userId: string;
  private firestore: AngularFirestore;
  constructor(private afs: AngularFirestore, private authService: UserService) {
    this.jobOffersCollection = afs.collection<JobOffer>('josofferts');
    this.jobOffers$ = this.jobOffersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as JobOffer;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public setUserId(userId: string) {
    this.userId = userId;
    this.jobOffersCollection = this.afs.collection<JobOffer>(
      'josofferts',
      (ref) => ref.where('applicants', 'array-contains', this.userId)
    );
  }

  public getApplicantJobOffers(): Observable<JobOffer[]> {
    return this.jobOffersCollection.snapshotChanges().pipe(
      map((actions: DocumentChangeAction<JobOffer>[]) =>
        actions.map((a: DocumentChangeAction<JobOffer>) => {
          const data = a.payload.doc.data() as JobOffer;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  public deleteApplicantJobOffer(jobOfferId: string) {
    const jobOfferRef = this.afs
      .collection('josofferts')
      .doc<JobOffer>(jobOfferId);
    return jobOfferRef.update({
      applicants: firebase.firestore.FieldValue.arrayRemove(this.userId),
    });
  }

  getJobOfferById(jobOfferId: string) {
    return this.afs
      .collection('josofferts')
      .doc<JobOffer>(jobOfferId)
      .valueChanges();
  }

  getJobOffers(): Observable<JobOffer[]> {
    return this.jobOffers$;
  }

  async addJobOffer(jobOffer: JobOffer): Promise<DocumentReference<JobOffer>> {
    const userId = await this.authService.getUserId();
    jobOffer.userId = userId;
    return this.jobOffersCollection.add(jobOffer);
  }

  public applyJobOffer(jobOfferId: string, userId: string) {
    const jobOfferRef = this.afs.collection('josofferts', ref => ref.where('docId', '==', jobOfferId)).doc(jobOfferId);

    console.log(`Retrieving job offer: ${jobOfferId}`);

    return jobOfferRef.get().toPromise()
      .then((doc) => {
        const jobOffer = doc.data() as JobOffer;

        if (!jobOffer) {
          console.warn(`Job offer ${jobOfferId} not found`);
          return null;
        }

        console.log(`Job offer retrieved: ${jobOfferId}`);

        if (jobOffer.applicants && jobOffer.applicants.includes(userId)) {
          console.warn(`User ${userId} has already applied to job offer ${jobOfferId}`);
          return null;
        }

        const updatedApplicants = jobOffer.applicants
          ? [...jobOffer.applicants, userId]
          : [userId];

        console.log(`Updating job offer: ${jobOfferId} with applicants:`, updatedApplicants);

        return jobOfferRef.update({ applicants: updatedApplicants });
      })
      .catch((error) => {
        console.error(`Error applying to job offer:`, error);
        throw error;
      });
  }





  public deleteApplicantJobOfferByUser(jobOfferId: string, userId: string) {
    const jobOfferRef = this.afs
      .collection('josofferts')
      .doc<JobOffer>(jobOfferId);
    return jobOfferRef.update({
      applicants: firebase.firestore.FieldValue.arrayRemove(userId),
    });
  }

  public deleteJobOffer(jobOfferId: string) {
    return this.afs.collection('josofferts').doc(jobOfferId).delete();
  }
}
