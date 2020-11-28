import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu :any[] = [

    {
      titulo: 'Darshboard!!',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Main', url: '/'},
        {titulo: 'ProgreessBar', url: 'progress'},
        {titulo: 'Gráficas', url: 'grafica1'},
        {titulo: 'Promesas', url: 'promesas'},
        {titulo: 'Rxjs', url: 'rxjs'},
        {titulo: 'Perfil', url: 'perfil'}
      ]
    },

    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: 'usuarios'},
        {titulo: 'Hospitales', url: 'hospitales'},
        {titulo: 'Medicos', url: 'medicos'},
        
      ]
    }

  ];

  constructor() { }
}
