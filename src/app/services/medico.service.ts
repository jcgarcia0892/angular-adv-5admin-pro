import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Medico } from './../models/medico';
// Environment
// Models


const base_url: string = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

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



  cargarMedicos(): any {
    const url = `${base_url}/medicos`;
    return  this.http.get(url, this.headers)
            .pipe(
              map((resp: any) => resp.medicos)
              // map((resp: {ok: boolean, medicos: Medico[]}) => resp.medicos)
            );
  }

  cargarMedicoById(id: string): any {
    const url = `${base_url}/medicos/${ id }`;
    console.log(url);
    return  this.http.get(url, this.headers)
            .pipe(
              map((resp: any) => resp.medico)
              // map((resp: {ok: boolean, medico: Medico}) => resp.medico)
            );
  }

  crearMedicos( nombre: string, hospital: string ): any {
    const url = `${base_url}/medicos`;
    return  this.http.post(url, {nombre, hospital}, this.headers);

  }

  actualizarMedicos( _id: string, nombre: string, hospital: string ): any {
    console.log(hospital);
    const url = `${base_url}/medicos/${_id}`;
    return  this.http.put(url, {nombre, hospital}, this.headers);

  }

  borrarMedicos( _id: string ): any{
    const url = `${base_url}/medicos/${_id}`;
    return  this.http.delete(url, this.headers);

  }
}
