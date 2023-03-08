import { Injectable } from '@angular/core';

import { Auth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Post } from '../../app/interfaces/post.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<Post>;

  constructor(private firestore: AngularFirestore, private auth: Auth) {
    this.postsCollection = this.firestore.collection<Post>('posts');
  }

  getPosts() {
    return this.postsCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  addPost(post: Post) {
    post.userId = this.auth.currentUser.uid;
    return this.postsCollection.add(post);
  }

  deletePost(id: string) {
    return this.postsCollection.doc(id).delete();
  }

  updatePost(id: string, post: Post) {
    return this.postsCollection.doc(id).update(post);
  }

  async likePost(postId: string) {
    // Obtiene la referencia del documento de la publicación
    const postDocRef = this.firestore.collection('posts').doc(postId);

    // Obtiene el documento de la publicación actual
    const postDoc = await postDocRef.get().toPromise();
    const post = postDoc.data() as Post;

    // Incrementa el contador de likes de la publicación
    post.likes = (post.likes || 0) + 1;

    // Actualiza el documento de la publicación en la base de datos
    await postDocRef.update(post);
  }

}
