import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';



const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})


export class FileUploadService {

  constructor() { }

  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios' | 'hospitales' | 'medicos',
    id: string
  ) {

    try {
      const url = `${base_url}/uploads/${tipo}/${id}`;
      const formData = new FormData();//Esto sirve para enviar información al backend ocn el fetch
      formData.append('imagen', archivo);
      console.log(formData);
      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      } );

      const data = await resp.json();

      console.log(data);
      if(data) {
        return data.nombreArchivo;
      }else {
        console.log(data.msg);
        return false;
      }

    } catch (error) {
      console.log(error);
      return false;
    }

  }

}
