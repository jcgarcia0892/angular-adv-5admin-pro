import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment'
import { Usuario } from '../models/usuario';


const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})

export class BusquedaService {

  constructor(  private http: HttpClient) { }


  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  transformarUsuario( resp:any[] ):Usuario[] {
    return resp.map( (user) => {
      return new Usuario(user.nombre, user.email, '', user.google, user.rol, user.img, user.uid)
    })
  }

  buscar(tipo: 'usuarios' | 'medicos' | 'hospitales', termino: string) {
    const url = `${base_url}/todo/coleccion/${tipo}/${termino}`
    return this.http.get( url, this.headers)
      .pipe(
        map((resp:any) => {
          
          switch (tipo) {
            case 'usuarios':
              return this.transformarUsuario(resp.resultados);              
          
            default:
              return [];
          }

        })
      )

  }
}
