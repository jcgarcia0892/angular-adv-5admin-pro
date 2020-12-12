import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FileUploadService } from './../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  perfilForm: FormGroup;
  usuario: Usuario;
  imagen: File;
  imgInstantanea: any = '';

  constructor(  private fb: FormBuilder,
                private usuarioService: UsuarioService,
                private fileUpoladService: FileUploadService) {

    this.usuario  = this.usuarioService.usuario;
    console.log(this.usuario);
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    });

  }

  actualizarForm(): any {
    console.log(this.perfilForm.value);
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe((data: any) => {
        console.log(data);
        const {nombre, email} = data.usuario;
        this.usuario.nombre = nombre;
        this.usuario.email = email;

        Swal.fire('Guardado', 'El usuario se ha guardado correctamente', 'success');

      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });

  }

  actualizarImagen(imagen: File): any {
    this.imagen = imagen;
    if (!imagen){
      return;
    }
    const render  = new FileReader();
    render.readAsDataURL(imagen);
    render.onloadend  = () => {
      this.imgInstantanea = render.result;
    };

  }

  subirImagen(): any{
    this.fileUpoladService.actualizarFoto(this.imagen, 'usuarios', this.usuario.uid)
      .then((nombreImagen: any) => {
        this.usuario.img  = nombreImagen;
        Swal.fire('Guardada', 'La imagen ha sido actualizada', 'success');
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg , 'error');

      });
  }

}
