import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router ){

  }

  canActivate(){

    if( this._usuarioService.usuario.role === 'ADMIN'){
      return true;
    }
    else{
      console.log('BLOQUEADO POR EL ADMIN GUARD')
      this._usuarioService.logout();
      return false;
    }
  }
}
