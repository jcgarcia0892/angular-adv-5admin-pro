import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(  private usuarioService: UsuarioService,
                private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{

    // return (this.usuarioService.userRol === 'ADMIN_ROL') ? true : false;
    if ( this.usuarioService.userRol === 'ADMIN_ROL'){
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
