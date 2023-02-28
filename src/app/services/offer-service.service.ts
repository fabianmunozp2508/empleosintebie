import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { JobOffer } from '../interfaces/offer.interfaces';
import firebase from 'firebase/compat/app';
import { addDoc, collection } from 'firebase/firestore';
import { UserService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class OfferServiceService {
  private jobOffersCollection: AngularFirestoreCollection<JobOffer>;
  private jobOffers$: Observable<JobOffer[]>;
  private userId: string;
  private firestore: AngularFirestore;
  constructor(private afs: AngularFirestore, private authService: UserService) {
    this.jobOffersCollection = afs.collection<JobOffer>('josofferts');
    this.jobOffers$ = this.jobOffersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as JobOffer;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public setUserId(userId: string) {
    this.userId = userId;
    this.jobOffersCollection = this.afs.collection<JobOffer>('josofferts', ref => ref.where('applicants', 'array-contains', this.userId));
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
    const jobOfferRef = this.afs.collection('josofferts').doc<JobOffer>(jobOfferId);
    return jobOfferRef.update({
      applicants: firebase.firestore.FieldValue.arrayRemove(this.userId)
    });
  }

  getJobOfferById(jobOfferId: string) {
    return this.afs.collection('josofferts').doc<JobOffer>(jobOfferId).valueChanges();
  }


  getJobOffers(): Observable<JobOffer[]> {
    return this.jobOffers$;
  }

  async addJobOffer(jobOffer: JobOffer): Promise<DocumentReference<JobOffer>> {
    const userId = await this.authService.getUserId();
    jobOffer.userId = userId;
    return this.jobOffersCollection.add(jobOffer);
  }

  applyJobOffer(jobOfferId: string, userId: string): Promise<void> {
    const jobOfferRef = this.afs.collection('josofferts').doc<JobOffer>(jobOfferId);
    return jobOfferRef.update({
      applicants: firebase.firestore.FieldValue.arrayUnion(userId)
    }).then(() => {
      console.log('User applied successfully');
    }).catch((error) => {
      console.log('Error applying for job offer:', error);
      throw error;
    });
  }


  public deleteApplicantJobOfferByUser(jobOfferId: string, userId: string) {
    const jobOfferRef = this.afs.collection('josofferts').doc<JobOffer>(jobOfferId);
    return jobOfferRef.update({
      applicants: firebase.firestore.FieldValue.arrayRemove(userId)
    });
  }



  public deleteJobOffer(jobOfferId: string) {
    return this.afs.collection('josofferts').doc(jobOfferId).delete();
  }
}
