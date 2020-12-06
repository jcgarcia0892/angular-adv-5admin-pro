import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { RegisterForm } from './../interfaces/register-form.interface';
import { LoginForm } from './../interfaces/login-form.interface';

import { Usuario }  from './../models/usuario'

declare const gapi:any;
@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  base_url:string = environment.base_url;

  auth2:any;
  usuario: Usuario;
  constructor(  private http:HttpClient,
                private router: Router,
                private ngZone: NgZone) {

                  this.googleInit();

  }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid;
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  googleInit() {

    return new Promise((resolve, reject) => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '628844495691-70s9mrrm78fseqp3rq8sh544c4rdnqpk.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });

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

    
    return this.http.get(`${this.base_url}/auth/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const {email, google, nombre, role, img = '', uid} = resp.usuarioDB;
        this.usuario  = new Usuario(nombre, email, '', google, role, img, uid);

        localStorage.setItem('token', resp.token)
        return true;
      }),
      catchError( error => {
        console.log(error)
        return of(false)
      })
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

  actualizarUsuario( data: {email:string, nombre:string, role:string} ) {

    data = {
      ...data,
      role: this.usuario.rol
    }

    return this.http.put(`${this.base_url}/usuarios/${this.uid}`, data, this.headers)
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

  cargarUsuarios( desde:number = 0 ) {
    const url = `${this.base_url}/usuarios?desde=${desde}`;
    return this.http.get<{total: number, usuarios:any}>(url, this.headers)
      .pipe(
        delay(500),
        map((resp) => {
          const usuarios = resp.usuarios.map((user) => {
            return new Usuario(user.nombre, user.email, '', user.google, user.rol, user.img, user.uid);
          }); 

          return {
            total: resp.total,
            usuarios
          };
        })
      )

  }

  eliminarUsuario(usuario:Usuario) {
    
    const url = `${this.base_url}/usuarios/${usuario.uid}`;
    return this.http.delete(url, this.headers);


  }

  actualizarRol( data:Usuario) {
    console.log(data);
    return this.http.put(`${this.base_url}/usuarios/${data.uid}`, data, this.headers)
  }

}
