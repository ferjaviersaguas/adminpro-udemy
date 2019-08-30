import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  constructor( public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar( usuario: Usuario){
    
    console.log(usuario);

    // Mandar los datos actualizados. El this.usuario.nombre va a cambiar
    // el usuario.nombre que nosotros mandemos 
    this.usuario.nombre = usuario.nombre;

    // Si el usuario no es de Google, si actualizamos correo
    if( !this.usuario.google){
    this.usuario.email = usuario.email;
    }
   
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe()
  }

  seleccionImagen( archivo: File ){

    // Si ponemos cancelar no nos devuelve nada
    if( !archivo ){
      this.imagenSubir = null;
      return;
    }
    
    if( archivo.type.indexOf('image') < 0){
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      // this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
    // console.log(archivo);
  }

  cambiarImagen(){
      this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }


}
