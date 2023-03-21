import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';

import {
  Auth, User, user,

} from '@angular/fire/auth';
import 'firebase/firestore';
import { Role } from '../interfaces/role';
import { UserService } from './usuario.service';
import { Observable } from 'rxjs/internal/Observable';
import { from, map, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  role:Role
  private rolesCollection: AngularFirestoreCollection<Role>;

  constructor(private firestore: AngularFirestore, private auth: Auth,  private userService: UserService, private afs: AngularFirestore) {
    this.rolesCollection = firestore.collection<Role>('roles');

  }

  async assignRole(userId: string, role: string): Promise<void> {
    // Agrega un documento con el rol para el usuario especificado
    await this.afs.collection<Role>('roles').doc(userId).set({ role });
  }


  getRole(): Observable<Role> {
    if (!this.userService.isAuthenticated()) {
      // Redirect the user to the login page or show an error message
      return of(null);
    }

    return from(this.userService.getCurrentUser()).pipe(
      switchMap(user => {
        if (!user) {
          // Show an error message or redirect the user to the login page
          return of(null);
        }
        return this.afs.collection<Role>('roles').doc(user.uid).valueChanges().pipe(
          map(r => {
            if (r && r.hasOwnProperty('role')) {
              let role: Role = {
                role: 'admin'
              };
              role.role = r.role;
              return role;
            } else {
              return null;
            }
          })
        );
      })
    );
  }

  async getRoleByUserId(userId: string): Promise<Role> {
    const roleRef = this.afs.collection<Role>('roles').doc(userId);
    const role = await roleRef.valueChanges().pipe(take(1)).toPromise();
    if (role) {
      return role;
    }
    return null;
  }
  async getUsersByRole(role: string): Promise<User[]> {
    const rolesSnapshot = await this.rolesCollection.get().toPromise();
    const usersWithRole: User[] = [];
    rolesSnapshot.forEach(async doc => {
      const roleData = doc.data() as Role;
      if (roleData.role === role) {
        const userId = doc.id;
        const userData = await this.userService.getUser(userId);
        usersWithRole.push(userData);
      }
    });
    return usersWithRole;
  }

  










}

