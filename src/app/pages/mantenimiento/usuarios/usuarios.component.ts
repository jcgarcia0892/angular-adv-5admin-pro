import Swal from 'sweetalert2';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

// Librerias externas

// Servicios

// Modelo

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  imgSubs: Subscription;
  usuarios: Usuario[];
  usuariosTemp: Usuario[];
  totalUsuarios = 0;
  desde          = 0;
  cargando      = true;

  constructor(  private usuarioService: UsuarioService,
                private busquedaService: BusquedaService,
                private modalImagenService: ModalImagenService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.imgSubs  = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(data => this.cargarUsuarios());

  }

  ngOnDestroy(): void  {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total,
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });

  }



  cambiarPagina(valor: number): void {
    this.desde += valor;

    if (this.desde < 0) {
      this.desde = 0;
    }else if (this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();

  }

  buscar(termino: string): any  {

    if (termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe( (resp: Usuario[]) => this.usuarios = resp);
  }

  eliminarUsuario(usuario): any  {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puede borrarse asi mismo', 'error');
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario( usuario )
          .subscribe(resp => {
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }

  cambiarRol(usuario): void  {
    console.log(usuario);
    this.usuarioService.actualizarRol(usuario)
      .subscribe(console.log);
  }

  abrirModal(usuario: Usuario): void {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
