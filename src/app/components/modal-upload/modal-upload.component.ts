import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SubirArchivoService, ModalUploadService, UsuarioService } from 'src/app/services/services.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  imagenSubir: File;
  imagenTemp: string;

  constructor( public _subirArchivoService: SubirArchivoService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    console.log("Modal listo");
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

    //Preview de imagen
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result.toString();
    // console.log(archivo);
  }

  subirImagen(){
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo , this._modalUploadService.id )
    .then( res =>{
          console.log(res);
          this._modalUploadService.notificacion.emit( res );          
          // this._modalUploadService.ocultarModal();
          this.cerrarModal();
    })
    .catch( err =>{
      console.log('Error en la carga');
    })
  }

  cerrarModal(){
    this.imagenSubir = null;
    this.imagenTemp = null;

    this._modalUploadService.ocultarModal();
  }



}
