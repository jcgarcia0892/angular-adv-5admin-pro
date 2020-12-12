import { Hospital } from 'src/app/models/hospital';
import { Usuario } from 'src/app/models/usuario';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(  private activatedRoute: ActivatedRoute,
                private busquedaService: BusquedaService,
                private router: Router) {


                  this.activatedRoute.params
                  .subscribe(({termino}) => {
                    this.busquedaGlobal(termino);
                  });
                }

  ngOnInit(): void {

  }

  busquedaGlobal( termino ): any {
    this.busquedaService.busquedaGlobal(termino)
      .subscribe(({usuarios, medicos, hospitales}) => {
        this.usuarios = usuarios;
        this.medicos = medicos;
        this.hospitales = hospitales;
        console.log(this.usuarios.length);
      });
  }

  redirigirMedico(medico): any {
    this.router.navigate([`/dashboard/medico/${medico._id}`]);
  }

}
