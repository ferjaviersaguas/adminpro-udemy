import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/medico/medico.service';
import { NgForm } from '@angular/forms';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from '../../models/medico.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';




@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

hospitales: Hospital[] = [];
medico: Medico = new Medico('','','','','');
hospital: Hospital = new Hospital('');

  constructor( public _medicoService: MedicoService, public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService, public router: Router, public activatedRoute: ActivatedRoute ) { 

    activatedRoute.params.subscribe( params => {

      // 'id' es el mismo nombre que el de pages routes medico/:id
      let id = params['id'];

      if( id !== 'nuevo' ){
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales().subscribe( (res:any) => {
      this.hospitales = res.hospitales;
    });

    this._modalUploadService.notificacion.subscribe( res =>{
      // console.log( res )
      this.medico.img = res.medico.img;
    });
  }

  guardarMedico( f:NgForm ){

    console.log( f.valid );
    console.log( f.value );

    if( f.invalid ){
      return;
    }
    
    this._medicoService.crearMedico( this.medico ).subscribe( medico =>{
      console.log(medico);

      this.medico._id = medico._id
      this.router.navigate( ['/medico', medico._id] );
    }), err =>{

    }
    ;
  }

  cambioHospital( id: string ){
    console.log(id);
    this._hospitalService.obtenerHospital( id ).subscribe( hospital => {
      console.log( hospital)
      this.hospital = hospital});
   
  }

  cargarMedico( id: string ){
     
    this._medicoService.cargarMedico( id ).subscribe( medico => {
      console.log(medico);
    
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital( this.medico.hospital );
    });
  }

  cambiarFoto(){
      this._modalUploadService.mostrarModal( 'medicos', this.medico._id);
  }
}
