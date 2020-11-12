import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent implements OnInit {

  forma:FormGroup
  formSubmitted:boolean;
  constructor(  private fb:FormBuilder,
                private usuarioService:UsuarioService,
                private router:Router) {

    this.crearRegisterForm();

  }

  ngOnInit(): void {
  }

  crearRegisterForm() {

    this.formSubmitted = false;
    this.forma = this.fb.group({
      nombre: ['Julio', [Validators.required]],
      email: ['julio@gmail.com ', [Validators.required, Validators.email]],
      password: ['123', [ Validators.required]],
      password2: ['123', [Validators.required]],
      terminos: [false, [Validators.required]]
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });

  }

  crearUsuario(){
    console.log(this.forma.value);
    this.formSubmitted = true;
    if(this.forma.invalid) {
      return;
    }

    this.usuarioService.crearUsuario( this.forma.value )
      .subscribe((data)=> {
        
        this.router.navigate(['/'])
      }, (err) => {

        Swal.fire('Error', err.error.msg, 'error');
        
      })
    
     

  }

  campoNoValido(campo:string): boolean {
    
    if(this.forma.get(campo).invalid && this.formSubmitted){
      return true;
    }else {
      return false;
    }

  }

  contrasenasValidas():boolean{
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('password2').value;

    if(pass1 !== pass2 && this.formSubmitted){
      return true;
    }else {
      return false;
    }
  }

  aceptarTerminos(){
    return !this.forma.get('terminos').value && this.formSubmitted;
  }

  passwordsIguales(pass1Name, pass2Name){

    return (formGroup:FormGroup) => {
      const pass1 = formGroup.get(pass1Name);
      const pass2 = formGroup.get(pass2Name);

      if(pass1.value === pass2.value){
        pass2.setErrors(null);
      }else {
        pass2.setErrors({noSonIguales: true});
      }

    }

  }

}
