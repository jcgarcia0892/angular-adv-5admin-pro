import { Component, OnDestroy, OnInit } from '@angular/core';

//Librerias externas
import Swal from 'sweetalert2';

//Servicios
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

//Modelo
import { Usuario } from 'src/app/models/usuario';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {
  imgSubs:Subscription;
  usuarios:Usuario[];
  usuariosTemp:Usuario[];
  totalUsuarios: number = 0;
  desde:number          = 0;
  cargando:boolean      = true;

  constructor(  private usuarioService: UsuarioService,
                private busquedaService:BusquedaService,
                private modalImagenService:ModalImagenService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    this.imgSubs  = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100)
      )
      .subscribe(data => {
      this.cargarUsuarios()
    });

  }

  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({total, usuarios}) => {
      this.totalUsuarios = total,
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
    
  }



  cambiarPagina(valor:number){
    this.desde += valor;

    if(this.desde < 0) {
      this.desde = 0;
    }else if(this.desde >= this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();

  }

  buscar(termino:string) {

    if(termino.length === 0) {
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedaService.buscar('usuarios', termino)
      .subscribe( resp => this.usuarios = resp);
  }

  eliminarUsuario(usuario) {
    
    if(usuario.uid === this.usuarioService.uid) {
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
            )
          })
      }
    })
  }

  cambiarRol(usuario) {
    console.log(usuario);
    this.usuarioService.actualizarRol(usuario)
      .subscribe(console.log);
  }

  abrirModal(usuario:Usuario) {
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);
  }

}
