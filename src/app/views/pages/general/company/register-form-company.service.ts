import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference,
} from '@angular/fire/compat/storage';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { of } from 'rxjs';

import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  limit,
  orderBy,
  query,
  where,
  updateDoc,
  getDoc,
  setDoc,
  CollectionReference,
} from '@angular/fire/firestore';
import { CompanyForm } from 'src/app/interfaces/company';
import { Job } from 'src/app/interfaces/job.interfaces';
import { JobOffer } from 'src/app/interfaces/offer.interfaces';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormCompanyService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public companyForms: CompanyForm; //
  usuarios: any = {};
  private basePath = '/logos';
  public jobOffer:Job;
  private jobOffersCollection: AngularFirestoreCollection<JobOffer>;
  constructor(private firestore: Firestore, private auth: Auth, private storage: AngularFireStorage, private afs: AngularFirestore)  {
    this.jobOffersCollection = this.afs.collection<JobOffer>('jobOffers');
    const auth2 = getAuth();
    onAuthStateChanged(auth2, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.email;
        this.usuarios = uid;
      } else {
        // User is signed out
      }
    });
  }
  addJob(jobOffer: Job) {
    const jobOfferRef = collection(this.firestore, 'josofferts');
    jobOffer.userId = this.auth.currentUser.uid;
    return addDoc(jobOfferRef, jobOffer);
  }

  getJobOfferById(jobOfferId: string): Observable<JobOffer> {
    return this.jobOffersCollection.doc<JobOffer>(jobOfferId).valueChanges();
  }


  async updatejobOffer(josofferts: Job) {
    const data = {
   
     logo:josofferts.logo,
     name:josofferts.name,
     descriptionCompany:josofferts.descriptionCompany,
     userId:josofferts.userId,
     position:josofferts.position,
     department:josofferts.department,
     location:josofferts.location,
     salary:josofferts.salary,
     description:josofferts.description,
     applicants: josofferts.applicants
    };
    await updateDoc(doc(this.firestore, `josofferts/${josofferts.userId}`), data);
    console.log('josofferts', josofferts.userId);
  }

  getJobOffers(): Observable<Job[]> {
    const jobOfferRef = collection(this.firestore, 'josofferts') as CollectionReference<Job>;
    return collectionData<Job>(jobOfferRef);
  }
  async addcompanyForm(companyForms: CompanyForm, logoFile: File) {
    const companyFormRef = collection(this.firestore, 'companyForms');
    companyForms.userId = this.auth.currentUser.uid;
    // Subir archivo a Firebase Storage
    const fileRef = this.storage.ref(`logos/${companyForms.userId}/${logoFile.name}`);
    const task = this.storage.upload(`logos/${companyForms.userId}/${logoFile.name}`, logoFile);
    const snapshot = await task.snapshotChanges().toPromise();
    const downloadURL = await fileRef.getDownloadURL().toPromise();
    // Actualizar campo logo en Firestore
    companyForms.logo = downloadURL;
    // Guardar en Firebase Firestore
    const companyFormDocRef = await addDoc(companyFormRef, companyForms);
    return companyFormDocRef;
  }

  getcompanyForm(): Observable<CompanyForm[]> {
    if (this.auth.currentUser) {
      const userId = this.auth.currentUser.uid;
      const companyFormRef = collection(this.firestore, 'companyForms');
      const q = query(companyFormRef, where('userId', '==', userId));
      return collectionData(q, { idField: 'id' }) as Observable<CompanyForm[]>;
    } else {
      return of([]);
    }
  }


  }



