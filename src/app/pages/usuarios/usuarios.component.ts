import { Component, OnInit } from "@angular/core";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/services.index";
import Swal from "sweetalert2/dist/sweetalert2.js";
// import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;
@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe( res=>{
          this.cargarUsuarios();
        });
  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe((res: any) => {
      // console.log(res);
      this.totalRegistros = res.total;
      this.usuarios = res.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if(valor === 0) {
      this.desde = 0;
    }
    // console.log( desde );

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    // console.log(termino);

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        // console.log( usuarios );
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);

    // this._usuarioService.usuario._id es el usuario que esta logueado
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire("Error al borrar", "No se puede borrar a si mismo", "error");
      return;
    }

    swal({
      title: "¿Estas seguro?",
      text: "Estas a punto de borrar a: " + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(res => {
          console.log(res);
          this.cargarUsuarios();
          if (this.totalRegistros % 5 === 1) {
            this.cambiarDesde(0);
          }
        });
      }
    });
  }


  guardarUsuario( usuario: Usuario ){

    this._usuarioService.actualizarUsuario( usuario )
                        .subscribe();
  }
}
