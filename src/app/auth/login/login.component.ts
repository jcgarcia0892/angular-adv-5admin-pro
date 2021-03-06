import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  forma:FormGroup;
  auth2:any;

  constructor(  private router:Router,
                private fb:FormBuilder,
                private usuarioService:UsuarioService,
                private ngZone: NgZone) {

    this.crearLoginForm();
  }

  ngOnInit(): void {

    this.renderButton();

  }

  crearLoginForm() {

    this.forma = this.fb.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', [ Validators.required]],
      remember: [false]
    });

  }

  login() {
    
    this.usuarioService.loginUsuario(this.forma.value )
      .subscribe( (data) => {
        console.log(data);
        if(this.forma.get('remember').value) {
          localStorage.setItem('email', this.forma.get('email').value);
        }else {
          localStorage.removeItem('email');
        }
        //Navegar al dashboard
        this.router.navigate(['/']);

      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      })

  }

  //var id_token = googleUser.getAuthResponse().id_token;
 


  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });
    this.startApp();
    
  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          const id_token = googleUser.getAuthResponse().id_token;
          this.usuarioService.loginGoogle(id_token).subscribe(resp => {
            this.ngZone.run(() => {
              this.router.navigate(['/'])
            })
        
        });
          
        }, (error) => {
            alert(JSON.stringify(error, undefined, 2));
        });
  }

}
