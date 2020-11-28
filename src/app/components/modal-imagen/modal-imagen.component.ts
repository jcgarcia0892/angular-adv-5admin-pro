import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from './../../services/modal-imagen.service';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  imagen: File;
  imgInstantanea: any = '';

  constructor(  public modalImagenService:ModalImagenService,
                public fileUpoladService: FileUploadService) { }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgInstantanea = null;
    this.modalImagenService.cerrarModal();
  } 

  actualizarImagen(imagen:File) {
    this.imagen = imagen;
    if(!imagen){
      return;
    }
    const render  = new FileReader();
    render.readAsDataURL(imagen);
    render.onloadend  = () => {
      this.imgInstantanea = render.result;
    }

  }

  subirImagen(){

    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUpoladService.actualizarFoto(this.imagen, tipo, id)
      .then((nombreImagen:any) => {
        Swal.fire('Guardada', 'La imagen ha sido actualizada', 'success');

        this.modalImagenService.nuevaImagen.emit(nombreImagen);
        
        this.cerrarModal();
      })
      .catch((err) => {
        Swal.fire('Error', err.error.msg , 'error');

      });
  }

}
