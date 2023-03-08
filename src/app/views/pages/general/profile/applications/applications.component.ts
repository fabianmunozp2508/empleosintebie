import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/interfaces/post.interfaces';
import { Profile } from 'src/app/interfaces/profile';
import { PostService } from 'src/app/services/postservices.service';
import { UserService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  @Input() post: Post;
  user: any;
  selectedFile: File;
  newPost: Post = {
    title: '',
    content: '',
    imageURL: '',
    author: '',
    date: new Date(),
    userId: '',
    likes: 0,
  };
  posts:Post[]= [];
  constructor(
    private userService: UserService,
    private postService: PostService,
    private storage: AngularFireStorage,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().then((user) => {
      this.user = user;
    });
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts;
      console.log("this post service", posts);
    });
  }



  async deletePost(postId: string) {
    // Verificar si el usuario actual es el autor del post
    if (this.post.author === this.user.uid) {
      // Llamar al método deletePost del servicio de posts
      this.postService.deletePost(postId);
    } else {
      // Mostrar un mensaje de error si el usuario no es el autor del post
      console.error('Sólo el autor del post puede eliminarlo');
    }
  }
  async likePost(postId: string) {
    this.postService.likePost(postId);
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  async createPost() {
    // Verifica si se seleccionó una imagen
    if (this.selectedFile) {
      // Subir la imagen a Firebase Storage
      const filePath =
        'posts/' + this.selectedFile.name + '_' + new Date().getTime();
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, this.selectedFile);
      // Obtener la URL de descarga de la imagen
      const downloadURL = await fileRef.getDownloadURL().toPromise();
      this.newPost.imageURL = downloadURL;
    }

    // Agregar la publicación a la base de datos
    this.newPost.userId = this.user.uid;
    this.postService.addPost(this.newPost);

    // Limpiar los campos del formulario
    this.newPost = {
      content: '',
      imageURL: '',
      title: '',
      userId: '',
      author: '',
      date: new Date(),
      likes: 0,
    };
    this.selectedFile = null;
  }

  openModal(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
