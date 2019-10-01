import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/services.index';
import { Hospital } from '../../models/hospital.model';
import Swal from "sweetalert2/dist/sweetalert2.js";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  totalRegistro: number = 0;
  hospitales: Hospital[] = [];
  cargando: boolean;
  desde: number = 0;

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( () =>{ this.cargarHospitales()});
  }
  
  buscarHospital( termino: string ){
    // console.log(termino);
    if( termino.length <= 0){
      this.cargarHospitales();
      return;
    }
    // this._hospitalService.buscarHospital(termino).subscribe(hospitales => this.hospitales = hospitales);
    this._hospitalService.buscarHospital(termino).subscribe( (res:any) =>{
      this.hospitales = res.hospitales;
    });

    
  }

  cargarHospitales(){

    this._hospitalService.cargarHospitales( this.desde ).subscribe( (res:any) => {

      this.cargando = true;
      
      this.totalRegistro = res.total;
      this.hospitales = res.hospitales;

      this.cargando = false;

      // console.log(this.totalRegistro);
      // console.log(this.hospitales);
    });
  }

  cambiarDesde( valor:number ){
    
    let desde = this.desde + valor;
    if( valor === 0){
      this.desde = 0;
    }
    if( desde >= this.totalRegistro ){
      return;
    }
    if( desde < 0){
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

  obtenerHospital( hospital: Hospital ){

    // console.log(hospital);
    this._hospitalService.obtenerHospital( hospital._id ).subscribe( (res:any) =>{
      
      this.hospitales = res.hospital;
      // console.log(this.hospitales);
    });
  }

  borrarHospital( hospital: Hospital ){
    
    // console.log(hospital);

    swal({
      title: "¿Estas seguro?",
      text: "Estas a punto de borrar a: " + hospital.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital( hospital._id ).subscribe( (res:any) =>{     
          this.cargarHospitales();
          Swal.fire('Hospital borrado', 'El hospital ' + hospital.nombre + ' ha sido eliminado con éxito', 'success');
        
        });
      }
      });
  
  }

  actualizarHospital( hospital: Hospital ){
    // console.log( hospital );
    this._hospitalService.actualizarHospital( hospital ).subscribe();
    Swal.fire('Hospital actualizado', 'El hospital fue actualizado con éxito', 'success');
  }



  crearHospital(){

      swal({
        title: 'Crear hospital',
        text: 'Ingrese el nombre del hospital',
        content: 'input',
        icon: 'info',
        buttons: true,
        dangerMode: true
      }).then( (valor: string) =>{
      
        if( !valor || valor.length === 0){
          return;
        }
      
        this._hospitalService.crearHospital( valor ).subscribe( () =>{
          Swal.fire('Hospital creado', 'El hospital ' + valor + ' fue creado con éxito', 'success');
          this.cargarHospitales();
        });
})}


actualizarImagen( hospital: Hospital ){
    this._modalUploadService.mostrarModal( 'hospitales', hospital._id);
}
}
