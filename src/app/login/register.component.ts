import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { UsuarioService } from '../services/services.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugins();
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;


  // Importo en el app.module el ReactiveFormsGroup para que pueda podamos conectar con el html

  constructor( public _usuarioService: UsuarioService, public router: Router ) {}

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1];
      let pass2 = group.controls[campo2];

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };
    };
  }

  passwordIguales(group: FormGroup) {
    return group.get('password').value === group.get('password2').value
       ? null : {'passwordNoIguales': true };
 }




  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.passwordIguales }
    );

    this.forma.setValue({
      nombre: "Test",
      correo: "test@test.com",
      password: "123456",
      password2: "123456",
      condiciones: true
    });
  }

  registarUsuario() {
    
    if ( !this.forma.valid ) {
      Swal.fire('Importante', 'Las contraseñas deben coincidir', 'warning')
      return;
    }


    if ( !this.forma.value.condiciones ) {
      Swal.fire('Importante', 'Debe aceptar las condiciones', 'warning')
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario ).subscribe( res =>{
        console.log( res );
        // Swal.fire('Usuario Creado', 'El usuario se creo con éxito', 'success')
        this.router.navigate(['/login']);
    });

  }
}
