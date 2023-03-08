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
  Query,
  getDocs,
} from '@angular/fire/firestore';

import { CompanyForm } from 'src/app/interfaces/company';
import { Job } from 'src/app/interfaces/job.interfaces';
import { JobOffer } from 'src/app/interfaces/offer.interfaces';
import { Profile } from 'src/app/interfaces/profile';
import { MisOfertas } from 'src/app/interfaces/misofertas';

@Injectable({
  providedIn: 'root',
})
export class RegisterFormCompanyService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public companyForms: CompanyForm; //
  usuarios: any = {};
  private basePath = '/logos';
  public jobOffer: Job;
  private misOfertasCollectionRef: CollectionReference<MisOfertas>;

  private jobOffersCollection: AngularFirestoreCollection<JobOffer>;
  constructor(
    private firestore: Firestore,
    private auth: Auth,
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {
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
    this.firestore = firestore;
    this.misOfertasCollectionRef = collection(
      this.firestore,
      'misofertas'
    ) as CollectionReference<MisOfertas>;
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
      logo: josofferts.logo,
      name: josofferts.name,
      descriptionCompany: josofferts.descriptionCompany,
      userId: josofferts.userId,
      position: josofferts.position,
      department: josofferts.department,
      location: josofferts.location,
      salary: josofferts.salary,
      description: josofferts.description,
      applicants: josofferts.applicants,
    };
    await updateDoc(
      doc(this.firestore, `josofferts/${josofferts.userId}`),
      data
    );
    console.log('josofferts', josofferts.userId);
  }

  getJobOffers(): Observable<Job[]> {
    const jobOfferRef = collection(
      this.firestore,
      'josofferts'
    ) as CollectionReference<Job>;
    return collectionData<Job>(jobOfferRef);
  }
  async addcompanyForm(companyForms: CompanyForm, logoFile: File) {
    const companyFormRef = collection(this.firestore, 'companyForms');
    companyForms.userId = this.auth.currentUser.uid;
    // Subir archivo a Firebase Storage
    const fileRef = this.storage.ref(
      `logos/${companyForms.userId}/${logoFile.name}`
    );
    const task = this.storage.upload(
      `logos/${companyForms.userId}/${logoFile.name}`,
      logoFile
    );
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
  getJobOffersByUser(): Observable<Job[]> {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      const jobOfferRef = collection(
        this.firestore,
        'josofferts'
      ) as CollectionReference<Job>;
      const q = query(jobOfferRef, where('userId', '==', currentUser.uid));
      return collectionData<Job>(q);
    } else {
      return of([]); // o lanzar un error o hacer otra cosa
    }
  }
  // Método para borrar una oferta de empleo
  deleteJobOffer(offer: Job): Promise<void> {
    // Obtiene la referencia del documento de la oferta que se quiere borrar
    const offerDocRef = doc(this.firestore, 'josofferts', offer.userId);

    // Verifica si el usuario actual es el propietario de la oferta o tiene un rol de administrador
    return of(this.auth.currentUser)
      .pipe(
        switchMap((user: any) => {
          if (user && (user.uid === offer.userId || user.isAdmin)) {
            // Si el usuario es el propietario de la oferta o tiene un rol de administrador, se borra la oferta
            return deleteDoc(offerDocRef);
          } else {
            // Si el usuario no tiene permiso para borrar la oferta, se lanza un error
            return Promise.reject(
              new Error('No tienes permiso para borrar esta oferta.')
            );
          }
        })
      )
      .toPromise();
  }

  applyToJobOffer(offer: Job, profile: Profile): Promise<void> {
    // Obtiene la referencia del documento de la oferta a la que se quiere aplicar
    const offerDocRef = doc(this.firestore, 'josofferts', offer.id);

    // Agrega el perfil del usuario a la lista de aplicantes de la oferta
    offer.applicants = offer.applicants || [];
    offer.applicants.push(profile);

    // Actualiza la oferta en la base de datos
    return this.updatejobOffer(offer)
      .then(() => {
        // Si se actualiza la oferta correctamente, se guarda la aplicación del usuario en la base de datos
        const myJobOfferRef = doc(this.firestore, `misofertas/${offer.id}`);
        const myJobOffer = { offerId: offer.id, profile };
        return setDoc(myJobOfferRef, myJobOffer);
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(new Error('Error al aplicar a la oferta.'));
      });
  }
  // getJobOfferApplicants(offer: Job): Observable<Profile[]> {
  //   const applicantsCollectionRef = collection(this.firestore, 'jobOffers', offer.id, 'applicants');

  //   // Realiza una consulta para obtener los aplicantes de la oferta
  //   const applicantsQuery = query(applicantsCollectionRef, where('offerId', '==', offer.id));

  //   // Combina las consultas para obtener la oferta y los aplicantes en una sola petición
  //   const combinedQuery = forkJoin({
  //     offerDoc: getDoc(doc(this.firestore, 'jobOffers', offer.id)),
  //     applicants: getDocs(applicantsQuery).pipe(
  //       map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data() as Profile))
  //     )
  //   }).pipe(
  //     // Mapea los resultados de la consulta para devolver un arreglo de aplicantes
  //     map(({ offerDoc, applicants }) => {
  //       const offer = offerDoc.data() as Job;
  //       const applicantsWithStatus = applicants.map((applicant) => {
  //         // Agrega el estado de la aplicación (aprobado, pendiente, rechazado) al perfil del aplicante
  //         const status = offer.applicants?.find(
  //           (app) => app.profile.id === applicant.id
  //         )?.status;
  //         return { ...applicant, status };
  //       });
  //       return applicantsWithStatus;
  //     })
  //   );

  //   return combinedQuery;
  // }


}
