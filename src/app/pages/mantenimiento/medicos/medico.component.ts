import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital';
import { HospitalService } from 'src/app/services/hospital.service';
import { Medico } from 'src/app/models/medico';
import { MedicoService } from './../../../services/medico.service';
import { PartialObserver, Subscriber } from 'rxjs';







@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  public hospitales: Hospital[];

  public medicoSeleccionado: Medico;
  public hospitalSeleccionado: Hospital;

  constructor(  private fb: FormBuilder,
                private hospitalService: HospitalService,
                private medicoService: MedicoService,
                private router: Router,
                private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => this.cargarMedico(id));

    this.medicoForm = this.fb.group({
      nombre: ['Julio', [Validators.required]],
      hospital: ['', [Validators.required]]
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital').valueChanges
      .subscribe( (hospitalId) => {
        console.log(this.hospitales);
        this.hospitalSeleccionado = this.hospitales.find( (hospital) => hospital._id === hospitalId );
        console.log(this.hospitalSeleccionado);
      });

  }


  cargarMedico(id: string): void {

    if (id === 'nuevo') {
      return;
    }

    this.medicoService.cargarMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe((medico) => {

        if (!medico) {
          return this.router.navigate([`/dashboard/medicos`]);

        }

        const {nombre, hospital: {_id}} = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({nombre, hospital: _id});
      });
  }

  cargarHospitales(): void {
    this.hospitalService.cargarHospitales()
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
      });
  }

  guardarMedico(): void{
    const { nombre }  = this.medicoForm.value;


    if (this.medicoSeleccionado) {
      // Actualizar
      const data  = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      };
      console.log(data);
      this.medicoService.actualizarMedicos( data._id, data.nombre, data.hospital )
        .subscribe( resp => {
          Swal.fire('Creado', `${nombre} fue actualizado correctamente`, 'success');
          console.log(resp);

        });

    } else {
      // Crear
      this.medicoService.crearMedicos( this.medicoForm.value.nombre, this.medicoForm.value.hospital)
        .subscribe( (resp: any) =>  {

          Swal.fire('Creado', `${nombre} fue creado correctamente`, 'success');
          this.router.navigate([`/dashboard/medico/${resp.medico._id}`]);
        });
    }
  }


}
