import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { CvProfiles } from '../interfaces/cv.interfaces';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';
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
} from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CvProfileService {
  private itemsCollection: AngularFirestoreCollection<any>;
  public cvprofiles: CvProfiles; //
  usuarios: any = {};
  constructor(private firestore: Firestore, private auth: Auth) {
    const auth2 = getAuth();
    onAuthStateChanged(auth2, (user) => {
      if (user) {
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.email;
        this.usuarios = uid;

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  addcvprofile(cvprofiles: CvProfiles) {

    const cvprofileRef = collection(this.firestore, 'cvprofiles');
    cvprofiles.userId = this.auth.currentUser.uid;
    return addDoc(cvprofileRef, cvprofiles);
  }


  getcvprofile(): Observable<CvProfiles[]> {
    if (this.auth.currentUser) {
      const userId = this.auth.currentUser.uid; // Obtén el ID del usuario actual
      const cvprofilesRef = collection(this.firestore, 'cvprofiles');
      const q = query(
        cvprofilesRef,
        where('userId', '==', userId)
      );
      return collectionData(q, { idField: 'id' }) as Observable<CvProfiles[]>;
    } else {
      return of([]);
    }
  }
  async updatecvprofile(cvprofiles: CvProfiles) {
    const data = {
      name: cvprofiles.name,
      email: cvprofiles.email,
      telefono: cvprofiles.telefono,
      direccion: cvprofiles.direccion,
      objetivo: cvprofiles.objetivo,
      educacion: cvprofiles.educacion,
      experiencia: cvprofiles.experiencia,
      habilidades: cvprofiles.habilidades,
      userId: cvprofiles.userId,
    };
    await updateDoc(doc(this.firestore, `cvprofiles/${cvprofiles.userId}`), data);
    console.log('cvprofiles', cvprofiles.userId);
  }

  async deletecvprofile(cvprofiles: CvProfiles) {
    await deleteDoc(doc(this.firestore, `cvprofiles/${cvprofiles.userId}`));
    console.log("cvprofiles", cvprofiles.userId)

    }

}







