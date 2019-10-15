import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
// import { map } from "rxjs/operators";

import { map, catchError } from "rxjs/operators";

import Swal from "sweetalert2/dist/sweetalert2.js";
import { Router } from "@angular/router";
import { SubirArchivoService } from "../subir-archivo/subir-archivo.service";
import { Observable } from 'rxjs';



@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    // console.log("Servicio usuario listo");
    this.cargarStorage();
  }

  renuevaToken(){
    // http://localhost:3000/login/renuevatoken?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InJvbGUiOiJBRE1JTl9ST0xFIiwiZ29vZ2xlIjpmYWxzZSwiX2lkIjoiNWQ5MzQ4OWRhZDkwMjczNTUwMDhhOWUzIiwibm9tYnJlIjoiVXN1YXJpbyA0IiwiZW1haWwiOiJ1c3VhcmlvNEB1c3VhcmlvNC5jb20iLCJwYXNzd29yZCI6IjstKSIsIl9fdiI6MH0sImlhdCI6MTU3MDQ1NjkyNywiZXhwIjoxNTcwNDcxMzI3fQ.9omsl7uXFtB6bvrBVZwUpjtpH_87YwuiQAlNsQ2lswg
    let url = URL_SERVICIOS + '/login/renuevatoken?token=' + this.token;


    return this.http.get( url ).pipe( map( (res:any) =>{
      this.token = res.token;
      localStorage.setItem('token', this.token);
      console.log('Token renovado');

      return true;
    }),
    catchError(err => {
      console.log(err.status);
      // throwError(err)
      this.router.navigate(['/login']);
      Swal.fire("No se pudo renovar token", err.error.mensaje, "error");
      return Observable.throw(err);
    })
    )
    
  }

  logout() {
    this.usuario = null;
    this.token = "";
    this.menu = [];

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    this.router.navigate(["/login"]);
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      this.menu = JSON.parse(localStorage.getItem("menu"));
    } else {
      this.token = "";
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("menu", JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  /// Iniciar Sesion con Google
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + "/login/google";

    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);

        return true;
      })
    );
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
        this.guardarStorage(res.id, res.token, res.usuario, res.menu);
        console.log(res);

        return true;
      }),
      catchError(err => {
        console.log(err.status);
        // throwError(err)
        Swal.fire("Error al ingresar", err.error.mensaje, "error");
        return Observable.throw(err);
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
      }),
      catchError(err => {
        console.log(err.status);
        // throwError(err)
        Swal.fire(
          "Error al crear el usuario",
          // err.error.errors.message,
          "El email debe ser único",
          "error"
        );
        return Observable.throw(err);
      })
    );
  }

  // Actualizar Usuario
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario/" + usuario._id;
    url += "?token=" + this.token;
    // console.log(url);

    return this.http.put(url, usuario).pipe(
      map((res: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = res.usuario;
          this.guardarStorage(
            usuarioDB._id,
            this.token,
            this.usuario,
            this.menu
          );
        }
        Swal.fire("Usuario actualizado", usuario.nombre, "success");
        return true;
      }),
      catchError(err => {
        console.log(err.status);
        // throwError(err)
        Swal.fire("Error al actualizar", err.error.errors.message, "error");
        return Observable.throw(err);
      })
    );
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, "usuarios", id)
      .then((res: any) => {
        // this.usuario.img = res.
        this.usuario.img = res.usuario.img;
        Swal.fire("Imagen actualizado", this.usuario.nombre, "success");
        this.guardarStorage(id, this.token, this.usuario, this.menu);

        // console.log( res );
      })
      .catch(res => {
        // console.log( res );
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + "/usuario?desde=" + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + "/busqueda/especifico/usuarios/" + termino;
    return this.http.get(url).pipe(map((res: any) => res.usuarios));
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + "/usuario/" + id + "?token=" + this.token;
    return this.http.delete(url).pipe(
      map(res => {
        Swal.fire(
          "Usuario borrado",
          "El usuario ha sido eliminado con éxito",
          "success"
        );
      }),
      catchError(err => {
        console.log(err.status);
        // throwError(err)
        Swal.fire("Error intentar borrar usuario", err.error.errors.message, "error");
        return Observable.throw(err);
      })
    );
  }
}
