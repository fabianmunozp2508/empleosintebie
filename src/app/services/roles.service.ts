import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import {
  Auth,

} from '@angular/fire/auth';
import 'firebase/firestore';
import { Role } from '../interfaces/role';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  role:Role
  private rolesCollection: AngularFirestoreCollection<Role>;

  constructor(private firestore: AngularFirestore, private auth: Auth) {
    this.rolesCollection = firestore.collection<Role>('roles');
  }

  public async assignRole(role: string): Promise<void> {
    const userId = this.auth.currentUser.uid;
    const rolesRef = this.firestore.collection('roles');
    const roleDoc = rolesRef.doc(userId);
    await roleDoc.set({ role });
  }

  public async getRole(): Promise<string> {
    const userId = this.auth.currentUser.uid;
    const roleDoc = await this.rolesCollection.doc(userId).get().toPromise();
    return roleDoc.data().role;
  }
}
