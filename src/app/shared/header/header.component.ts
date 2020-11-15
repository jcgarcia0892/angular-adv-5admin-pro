import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  usuario:Usuario;

  constructor(  private usuarioService: UsuarioService) {

    this.usuario = this.usuarioService.usuario;

  }

  ngOnInit(): void {
  }

  logout(){
    this.usuarioService.logout();
  }

}
