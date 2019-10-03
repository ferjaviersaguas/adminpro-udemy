import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[]=[];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( public activatedRoute: ActivatedRoute, public http: HttpClient ) {

  

    activatedRoute.params.subscribe( params =>{
      let termino = params['termino'];
      this.buscar( termino );
    })
   }

  ngOnInit() {
  }

  buscar( termino: string ){

    // http://localhost:3000/busqueda/todo/fer
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url ).subscribe( (res:any) =>{
      console.log(res);
      this.usuarios = res.usuarios;
      this.hospitales = res.hospitales;
      this.medicos = res.medicos;
      
    });
  }

}
