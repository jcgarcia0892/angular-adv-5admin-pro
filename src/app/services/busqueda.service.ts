import { environment } from './../../environments/environment';
import { Hospital } from '../models/hospital';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico';
import { Usuario } from '../models/usuario';




const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})

export class BusquedaService {

  constructor(  private http: HttpClient) { }



  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(): any {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  transformarUsuario( resp: any[] ): Usuario[] {
    return resp.map( (user) => {
      return new Usuario(user.nombre, user.email, '', user.google, user.rol, user.img, user.uid);
    });
  }

  tansformarHospitales( resp: any[] ): Hospital[] {
    return resp;

  }

  transformarMedicos( resp: any[] ): Medico[] {
    return resp;

  }

  busquedaGlobal( termino: string ): any {
    const url = `${base_url}/todo/${termino}`;
    return this.http.get( url, this.headers);
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string): any {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`;
    return this.http.get( url, this.headers)
      .pipe(
        map((resp: any) => {

          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuario(resp.resultados);

            case 'hospitales':
              return this.tansformarHospitales(resp.resultados);

            case 'medicos':
              return this.transformarMedicos(resp.resultados);
            default:
              return [];
          }

        })
      );

  }
}
