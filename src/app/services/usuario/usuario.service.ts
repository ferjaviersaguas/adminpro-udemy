import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class UsuarioService {

usuario: Usuario;
token: string;


  constructor(public http: HttpClient, public router: Router) {
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
}
