import { Injectable } from '@angular/core';

import { Hospital } from './../models/hospital';

import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';


  const base_url:string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {



  constructor(  private http:HttpClient) { }

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



  cargarHospitales( desde:number = 0 ) {
    const url = `${base_url}/hospitales`;
    return  this.http.get(url, this.headers)
            .pipe(
              map((resp: {ok:boolean, hospitales:Hospital[]}) => resp.hospitales)
            )
  }

  crearHospitales( nombre:string ) {
    const url = `${base_url}/hospitales`;
    return  this.http.post(url, {nombre}, this.headers)
           
  }

  actualizarHospitales( _id:string, nombre:string ) {
    const url = `${base_url}/hospitales/${_id}`;
    return  this.http.put(url, {nombre}, this.headers)
           
  }

  borrarHospitales( _id:string ) {
    const url = `${base_url}/hospitales/${_id}`;
    return  this.http.delete(url, this.headers)
           
  }

  


} 
