import { Component, OnInit } from '@angular/core';
import { CompanyForm } from 'src/app/interfaces/company';
import { CvProfiles } from 'src/app/interfaces/cv.interfaces';
import { JobOffer } from 'src/app/interfaces/offer.interfaces';
import { Post } from 'src/app/interfaces/post.interfaces';
import { Role } from 'src/app/interfaces/role';
import { BuscarService } from 'src/app/services/buscarservices.service';
import { UserService } from '../../../../services/usuario.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  resultados: Array<CompanyForm | CvProfiles | JobOffer | Post | Role> = [];

  constructor(private buscarService: BuscarService, private userService:UserService) {}

  ngOnInit(): void {}

  async buscar(cadena: string) {
    this.resultados = await this.buscarService.buscar(cadena);
  }

 

}
