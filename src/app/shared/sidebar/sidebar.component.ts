import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/services.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  constructor( public _sidebar: SidebarService, public _usuarioService: UsuarioService ) { 
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {
    
  }

}
