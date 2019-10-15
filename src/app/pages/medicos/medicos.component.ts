import { Component, OnInit } from "@angular/core";

import { MedicoService, ModalUploadService } from "src/app/services/services.index";
import { Hospital } from "src/app/models/hospital.model";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Medico } from 'src/app/models/medico.model';
declare var swal: any;
@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})

export class MedicosComponent implements OnInit {
  totalRegistros: number = 0;
  medicos: Medico[] = [];
  hospitales: Hospital;
  desde: number = 0;

  constructor(public _medicoService: MedicoService, public _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos( this.desde ).subscribe((res: any) => {
      this.totalRegistros = res.total;
      this.medicos = res.medicos;

      // console.log(this.totalRegistros);
      // console.log(this.medicos);
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
    this.cargarMedicos();
  }

  buscarMedico(termino: string) {
    // console.log(termino);

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedicos(termino).subscribe((res: any) => {
      this.medicos = res.medicos;
    });
  }

  borrarMedicos(medico: Medico) {
    swal({
      title: "¿Estas seguro?",
      text: "Estas a punto de borrar a: " + medico.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._medicoService.borrarMedicos(medico._id).subscribe(res => {
          this.cargarMedicos();
          Swal.fire('Medico borrado', 'El medico ' + medico.nombre + ' ha sido eliminado con éxito', 'success');
        });
      }
    });
  }

  actualizarImagen( medicos: Medico ){
    this._modalUploadService.mostrarModal( 'medicos', medicos._id);
}
}
