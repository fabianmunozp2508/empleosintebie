import { Injectable } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
} from '@angular/fire/auth';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Profile } from '../interfaces/profile';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersCollection: AngularFirestoreCollection<User>;
  private userId = new Subject<string>();

  setUserId(userId: string) {
    this.userId.next(userId);
  }

  get userId$() {
    return this.userId.asObservable();
  }
  usuario: any = {};
  public mostrar: boolean = false;

  constructor(private auth: Auth) {
    const auth2 = getAuth();
    onAuthStateChanged(auth2, (user) => {
      if (user) {
        const uid = user;
        this.usuario = uid;
        console.log('usuario', this.usuario);
      } else {
      }
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    const result = await signInWithPopup(this.auth, provider);
    const user = result.user;

    if (user) {
      this.usuario.email = user.email;
      this.usuario.photoURL = user.photoURL;
      this.usuario.username = user.displayName;
    }

    return result;
  }
  async isAuthenticated(): Promise<boolean> {
    const user = await this.auth.currentUser;
    return user !== null;
  }

  async getCurrentUser(): Promise<User> {
    const user = await this.auth.currentUser;
    return user;
  }

  logout() {
    signOut(this.auth);
    localStorage.removeItem('isLoggedin');
  }
  isLoggedIn() {
    this.mostrar = false;
    const user = localStorage.getItem('email')!;
    if (user.length == 0) {
      this.mostrar = true;
    }
    return this.mostrar;
  }

  async recuperar(email: string): Promise<void> {
    try {
      return await sendPasswordResetEmail(this.auth, email);
    } catch (err) {
      console.log(err);
    }
  }

  updateUser() {
    this.usuario = this.auth.currentUser;
    this.setUserId(this.usuario.uid);
  }
  public async getUserId(): Promise<string> {
    const user = await this.auth.currentUser;
    return user?.uid;
  }

}
