import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: "root"
})
export class UsuarioService {

usuario: Usuario;
token: string;


  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    console.log("Servicio usuario listo");
    this.cargarStorage();
  }

  logout(){
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  estaLogueado(){
    return ( this.token.length > 5) ? true : false;
  }

  cargarStorage(){
    
    if( localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    }
    else{
      this.token = '';
      this.usuario = null;
    }

  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  /// Iniciar Sesion con Google
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token })
        .pipe( map( (res:any) =>{
            this.guardarStorage( res.id, res.token, res.usuario);
            return true;
        }));
  }


  login(usuario: Usuario, recordar: boolean = false) {
    // Recordar email
    if (recordar) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    let url = URL_SERVICIOS + "/login";
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        // localStorage.setItem('id', res.id);
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.guardarStorage( res.id, res.token, res.usuario);
        return true;
      })
    );
  }

  /// Fin  Sesion con Google


  // Registrar
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";

    // return this.http.post( url, usuario );

    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        Swal.fire("Usuario Creado", usuario.email, "success");
        return res.usuario;
      })
    );
  }

  // Actualizar Usuario
  actualizarUsuario( usuario: Usuario ){
    
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);

    return this.http.put( url, usuario)
    .pipe(
  
    map((res: any) => {
      // this.usuario = res.usuario;
      let usuarioDB: Usuario = res.usuario;
      this.guardarStorage( usuarioDB._id, this.token, usuarioDB);
      // Swal('Usuario actualizado', usuario.nombre, 'success');
      Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      return true;
    })
    );
  }

  cambiarImagen( archivo: File, id: string){
    
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id)
      .then( (res:any) =>{
        // this.usuario.img = res.
        this.usuario.img = res.usuario.img;
        Swal.fire('Imagen actualizado', this.usuario.nombre, 'success');
        this.guardarStorage( id, this.token, this.usuario);

        console.log( res );
      })
      .catch( res => {
        console.log( res );
      });
      
  }
}
