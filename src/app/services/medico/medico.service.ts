import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor( public http: HttpClient, public _usuariosService: UsuarioService ) { }

  // http://localhost:3000/medico?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZ29vZ2xlIjpmYWxzZSwiX2lkIjoiNWQ3MjViNTEwMDZhODI0NWNjMWEyNGE2Iiwibm9tYnJlIjoiVXN1YXJpbyAxIiwiZW1haWwiOiJ1c3VhcmlvMUB1c3VhcmlvMS5jb20iLCJwYXNzd29yZCI6IjstKSIsIl9fdiI6MCwiaW1nIjoiNWQ3MjViNTEwMDZhODI0NWNjMWEyNGE2LTY4LnBuZyJ9LCJpYXQiOjE1NjkzNDk3NTcsImV4cCI6MTU2OTM2NDE1N30.Mmp7KqjYDxnbU2YZqySKciQSRe6-B5UG6bFZGHyaCtM
  cargarMedicos( desde: number = 0){

    // let url = URL_SERVICIOS + '/medico?token=' + this._usuariosService.token;
    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get( url );
    
  }
  // http://localhost:3000/busqueda/especifico/medicos/DRA
  buscarMedicos( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/especifico/medicos/' + termino;
    return this.http.get( url );
  }

  // http://localhost:3000/medico/5d5d3b6e6c00703ab0b43003?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZ29vZ2xlIjpmYWxzZSwiX2lkIjoiNWQ3MjViNTEwMDZhODI0NWNjMWEyNGE2Iiwibm9tYnJlIjoiVXN1YXJpbyAxIiwiZW1haWwiOiJ1c3VhcmlvMUB1c3VhcmlvMS5jb20iLCJwYXNzd29yZCI6IjstKSIsIl9fdiI6MCwiaW1nIjoiNWQ3MjViNTEwMDZhODI0NWNjMWEyNGE2LTY4LnBuZyJ9LCJpYXQiOjE1NjkzNTQ1ODcsImV4cCI6MTU2OTM2ODk4N30.OymAL0k1gFmlxDxRvP-sW_THn-8Ob58aCGoYl6yd97Y
  borrarMedicos( id: string ){
    let url = URL_SERVICIOS + '/medico/' + id + this._usuariosService.token;
    return this.http.delete( url );
  }

  // crear
  // http://localhost:3000/medico?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiX2lkIjoiNWQ0MWI4MzBjMmViZGYzODEwZTFiOGE0Iiwibm9tYnJlIjoidGVzdDEiLCJlbWFpbCI6InRlc3QxQHRlc3QxLmNvbSIsInBhc3N3b3JkIjoiOy0pIiwiX192IjowfSwiaWF0IjoxNTY1MDk4OTQyLCJleHAiOjE1NjUxMTMzNDJ9.RwXKa3YHruXexQndrMKmN0y3qWn1NXVwsfTe4royoI0
  
  // actualizar
  // http://localhost:3000/medico/5d498ba417dd3b24740aa7b7?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiX2lkIjoiNWQ0MWI4MzBjMmViZGYzODEwZTFiOGE0Iiwibm9tYnJlIjoidGVzdDEiLCJlbWFpbCI6InRlc3QxQHRlc3QxLmNvbSIsInBhc3N3b3JkIjoiOy0pIiwiX192IjowfSwiaWF0IjoxNTY1MTAwNDA5LCJleHAiOjE1NjUxMTQ4MDl9.7dN9HH5JfwbANUqyVxulACYfxF4Z4SxprbN9mMlLUOk
  
  crearMedico( medico: Medico ){
    
    let url = URL_SERVICIOS + '/medico' 

    // Actualizando
    if( medico._id ){
    
      url += '/' + medico._id;
      url += '?token=' + this._usuariosService.token;
      return this.http.put( url, medico ).pipe(map( (res:any) =>{
        Swal.fire('Medico Actualizado', medico.nombre, 'success');
        return res.medico;
      }));

    }
    // Crear
    else{
      url += '?token=' + this._usuariosService.token
      return this.http.post( url, medico).pipe( map( (res:any) =>{
        Swal.fire('Medico Creado', 'El medico ' + medico.nombre + ' fue creado con éxito', 'success');
        return res.medico;
      }));
    }

    

  }

  cargarMedico( id: string){
    // http://localhost:3000/medico/5d8a6215c3cc564ac0191baf
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).pipe( map( (res:any) =>{
     return res.medico;
    }))
  }
}
