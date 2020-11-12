import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { RegisterForm } from './../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';

declare const gapi:any;
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  base_url:string = environment.base_url;
  auth2:any;
  constructor(  private http:HttpClient,
                private router: Router,
                private ngZone: NgZone) {

                  this.googleInit();

  }

  googleInit() {

    return new Promise((resolve, reject) => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '628844495691-70s9mrrm78fseqp3rq8sh544c4rdnqpk.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
      });
      resolve();

    })

  
  }

  logout(){
    localStorage.removeItem('token');
    
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  validarToken():Observable<boolean> {

    const token = localStorage.getItem('token') || '';
    return this.http.get(`${this.base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((resp:any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError( error => of(false) )
    );

  }

  crearUsuario( formData:RegisterForm ) {
    console.log('Creando Usuario');
    //El segundo argumento del post es la data que vamos a enviar
    return this.http.post(`${this.base_url}/usuarios`, formData)
            .pipe(
              tap((resp:any) => {
                localStorage.setItem('token', resp.token);
              })
            )
    

  }

  loginUsuario( formData:LoginForm ) {
    return this.http.post(`${this.base_url}/auth`, formData)
              .pipe(
                tap((resp:any) => {
                  localStorage.setItem('token', resp.token);
                })
              )

  }

  loginGoogle( token ) {
    return this.http.post(`${this.base_url}/auth/google`, {token})
              .pipe(
                tap((resp:any) => {
                  localStorage.setItem('token', resp.token);
                })
              )

  }

}