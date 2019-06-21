import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styles: []
})
export class ProgressComponent implements OnInit {
  porcentaje1: number = 20;
  porcentaje2: number = 30;

  constructor() {}

  ngOnInit() {}

  // cambiar( valor:number ) {
  //   if (this.porcentaje >= 100 && valor > 0) {
  //     this.porcentaje = 100;
  //     return;
  //   }

  //   if (this.porcentaje <= 0 && valor < 0) {
  //     this.porcentaje = 0;
  //     return;
  //   }

  //   this.porcentaje += valor;
  // }

  // incrementar( valor ){
  //   this.porcentaje += valor;
  // }
  // decrementar( valor ){
  //   this.porcentaje -= valor;
  // }

  actualizar( event:number ){
    // console.log('Evento: ', event);
  }
}
