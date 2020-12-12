import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;

  constructor(  public usuarioService: UsuarioService,
                private router: Router) {

    this.usuario = this.usuarioService.usuario;

    console.log(this.usuario);
  }

  ngOnInit(): void {
  }

  logout(): void{
    this.usuarioService.logout();
  }

  buscar(termino): void {
    console.log(termino);
    if (termino.length === 0) {
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
