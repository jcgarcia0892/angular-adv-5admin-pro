import { environment } from 'src/environments/environment';
import { EventEmitter, Injectable } from '@angular/core';
const base_url  = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class ModalImagenService {

  private _ocultarModal = true;
  public tipo: 'usuarios' | 'hospitales' | 'medicos';
  public id: string;
  public img: string;

  public nuevaImagen: EventEmitter<string> = new EventEmitter();



  constructor() { }

  get ocultarModal(): boolean {
    return this._ocultarModal;
  }

  abrirModal(
    tipo: 'usuarios' | 'hospitales' | 'medicos',
    id: string,
    img: string  = 'no-img'
  ): void  {
    this._ocultarModal = false;

    this.tipo = tipo;
    this.id   = id;
    this.img  = img;

    if ( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    }

  }

  cerrarModal(): void  {
    this._ocultarModal = true;
  }

}
