import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth } from 'firebase/auth';
import { CompanyForm } from '../interfaces/company';
import { CvProfiles } from '../interfaces/cv.interfaces';
import { JobOffer } from '../interfaces/offer.interfaces';
import { Post } from '../interfaces/post.interfaces';
import { Role } from '../interfaces/role';



@Injectable({
  providedIn: 'root',
})
export class BuscarService {
  constructor(private firestore: AngularFirestore, private auth: Auth) {}

  async buscar(
    cadena: string
  ): Promise<Array<CompanyForm | CvProfiles | JobOffer | Post | Role>> {
    const resultados = [];
    const usuario = await this.auth.currentUser;
    if (usuario) {
      const companyForms = await this.firestore
        .collection<CompanyForm>('companyForms')
        .valueChanges()
        .toPromise();
      const cvprofiles = await this.firestore
        .collection<CvProfiles>('cvprofiles')
        .valueChanges()
        .toPromise();
      const jobsOffers = await this.firestore
        .collection<JobOffer>('jobsOffers')
        .valueChanges()
        .toPromise();
      const posts = await this.firestore
        .collection<Post>('posts')
        .valueChanges()
        .toPromise();
      const roles = await this.firestore
        .collection<Role>('roles')
        .valueChanges()
        .toPromise();

      resultados.push(
        ...companyForms.filter(
          (form) =>
            form.name.includes(cadena) || form.description.includes(cadena)
        )
      );
      resultados.push(
        ...cvprofiles.filter(
          (perfil) =>
            perfil.name.includes(cadena) || perfil.objetivo.includes(cadena)
        )
      );
      resultados.push(
        ...jobsOffers.filter(
          (oferta) =>
            oferta.position.includes(cadena) ||
            oferta.description.includes(cadena)
        )
      );
      resultados.push(
        ...posts.filter(
          (post) => post.title.includes(cadena) || post.content.includes(cadena)
        )
      );
      resultados.push(...roles.filter((rol) => rol.role.includes(cadena)));
    }
    return resultados;
  }
}
