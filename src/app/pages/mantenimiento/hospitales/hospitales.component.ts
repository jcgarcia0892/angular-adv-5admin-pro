import Swal from 'sweetalert2';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital';
import { HospitalService } from './../../../services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy{

  hospitales: Hospital[] = [];
  cargando: boolean;
  imgSubs: Subscription;
  hospitalTemp: Hospital[];

  constructor(  private hospitalService: HospitalService,
                private modalImagenService: ModalImagenService,
                private busquedaService: BusquedaService) { }
  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
   this.cargarHospitales();
   this.imgSubs  = this.modalImagenService.nuevaImagen
   .pipe(delay(100))
   .subscribe(data => this.cargarHospitales() );

  }

  cargarHospitales(): void {
    this.cargando = false;
    this.hospitalService.cargarHospitales()
      .subscribe(hospitales => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }

  guardarCambios(hospital: Hospital): void{
    this.hospitalService.actualizarHospitales( hospital._id, hospital.nombre )
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success');
      });
  }

  borrarHospital( hospital: Hospital ): void {
    this.hospitalService.borrarHospitales( hospital._id )
      .subscribe( resp => {
        this.cargarHospitales();
        Swal.fire('Borrado', hospital.nombre, 'success');
      });
  }

  async abrirSweetAlert(): Promise<any> {
    const {value = ''} = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true
    });

    if (value.trim().length > 0) {
      this.hospitalService.crearHospitales( value )
        .subscribe((resp: any) => {
          console.log(resp);
          this.hospitales.push(resp.hospital);
        });
    }


  }


  abrirModal(hospital: Hospital): any {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }


  buscar(termino: string): any {

    if (termino.length === 0) {
      return this.cargarHospitales();
    }

    this.busquedaService.buscar('hospitales', termino)
      .subscribe( resp => this.hospitales = resp);
  }

}
