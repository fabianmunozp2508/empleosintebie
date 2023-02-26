import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ofertas-empleo',
  templateUrl: './ofertas-empleo.component.html',
  styleUrls: ['./ofertas-empleo.component.scss']
})
export class OfertasEmpleoComponent implements OnInit {
  jobOffers = [
    {
      title: 'Desarrollador web',
      company: 'Empresa A',
      description: 'Se requiere un desarrollador web con experiencia en Angular y NodeJS.'
    },
    {
      title: 'Gerente de recursos humanos',
      company: 'Empresa B',
      description: 'Se requiere un gerente de recursos humanos con experiencia en gestión de equipos.'
    },
    {
      title: 'Analista de negocios',
      company: 'Empresa C',
      description: 'Se requiere un analista de negocios con experiencia en análisis de datos y toma de decisiones.'
    },
    {
      title: 'Diseñador gráfico',
      company: 'Empresa D',
      description: 'Se requiere un diseñador gráfico con experiencia en Adobe Creative Suite.'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
