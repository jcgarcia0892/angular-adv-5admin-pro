import Swal from 'sweetalert2';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico';
import { MedicoService } from './../../../services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  cargando = true;
  medicos: Medico[];
  imgSubs: Subscription;

  constructor(  private medicoService: MedicoService,
                private modalImagenService: ModalImagenService,
                private busquedaService: BusquedaService) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs  = this.modalImagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe(data => this.cargarMedicos() );
  }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos(): void {
    this.cargando = true;
    this.medicoService.cargarMedicos()
      .subscribe(resp => {
        console.log(resp);
        this.cargando = false;
        this.medicos = resp;
      });
  }

  abrirModal(medico: Medico): void {
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string): void {
    if (termino.length === 0) {
      return this.cargarMedicos();
    }
    this.busquedaService.buscar('medicos', termino)
      .subscribe( resp => this.medicos = resp);
  }

  borrarMedico(medico): void {
    console.log(medico);
    Swal.fire({
      title: '¿Borrar medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoService.borrarMedicos( medico._id )
          .subscribe(resp => {
            this.cargarMedicos();
            Swal.fire(
              'Medico borrado',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            );
          });
      }
    });
  }


}
