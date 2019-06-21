import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  
  //Tengo una referencia sin importar en que componente estoy
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @ViewChild('probandoFocus') probandoFocus: ElementRef;

  //Con el INPUT podemos mandar las variables renombradas a otro componente (app-incrementador) 
  @Input('nombre') leyenda: string = 'holis';
  @Input() porcentaje: number = 50;

  @Output('actualizaProgress') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    // console.log('Leyenda', this.leyenda);
    // console.log('Progreso', this.porcentaje);
   }

  ngOnInit() {
    // console.log('Leyenda', this.leyenda);
  }

  onChanges( newValue: number ){

  // let elemHTML: any = document.getElementsByName('porcentaje')[0];
  // console.log( this.txtProgress );

    // console.log( event );
    if( newValue >= 100){
        this.porcentaje = 100;
    }
    else if(newValue <= 0){
        this.porcentaje = 0;
    }
    else{
       this.porcentaje = newValue;
    }

    // elemHTML.value = this.porcentaje;
    this.txtProgress.nativeElement.value = this.porcentaje;
    this.cambioValor.emit( this.porcentaje );
  }

  cambiar( valor:number ) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje += valor;

    this.cambioValor.emit( this.porcentaje );

    this.txtProgress.nativeElement.focus();
  }

  boton(){
    console.log(this.probandoFocus);
      this.probandoFocus.nativeElement.focus();
  }

}
