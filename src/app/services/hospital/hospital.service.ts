import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { UsuarioService } from "../usuario/usuario.service";
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class HospitalService {
  // token: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  cargarHospitales( desde: number = 0) {

    // let url = URL_SERVICIOS + "/hospital?token=" + this._usuarioService.token;
    let url = URL_SERVICIOS + "/hospital?desde=" + desde;

    return this.http.get(url);
  }

  obtenerHospital(id: string) {

    let url = URL_SERVICIOS + "/hospital/" + id;

    // return this.http.get(url);
    // Otra forma de traer los datos
    return this.http.get(url).pipe( map( (res:any) =>{
      return res.hospital;
    }))
  }

  borrarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete( url );
  }

  actualizarHospital( hospital: Hospital ){

    let url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital );
  }

  // http://localhost:3000/busqueda/especifico/hospitales/s
  // buscarHospital( termino: string ){
  //   let url = URL_SERVICIOS + '/busqueda/especifico/hospitales/' + termino;
  //   return this.http.get( url ).pipe(map( (res:any) => {      
  //     return res.hospitales;
  //   }));

  // }
  buscarHospital( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/especifico/hospitales/' + termino;
    return this.http.get( url );

  }
 
  // http://localhost:3000/hospital?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZ29vZ2xlIjpmYWxzZSwiX2lkIjoiNWQ3MjViNTEwMDZhODI0NWNjMWEyNGE2Iiwibm9tYnJlIjoiVXN1YXJpbyAxIiwiZW1haWwiOiJ1c3VhcmlvMUB1c3VhcmlvMS5jb20iLCJwYXNzd29yZCI6IjstKSIsIl9fdiI6MCwiaW1nIjoiNWQ3MjViNTEwMDZhODI0NWNjMWEyNGE2LTY4LnBuZyJ9LCJpYXQiOjE1NjkyNTI2MDMsImV4cCI6MTU2OTI2NzAwM30.Iax2vETW3Z3jTCFjvBWYSmtrpr9Za7HrRX3TsI3aJh8
  crearHospital( nombre: string ){
  
    let url = URL_SERVICIOS + '/hospital?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } ).pipe( map( (res:any) =>{
      return res.hospital;
    }));
  }
}
