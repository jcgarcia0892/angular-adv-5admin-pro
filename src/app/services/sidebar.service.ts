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
        {titulo: 'Rxjs', url: 'rxjs'}
      ]
    }

  ];

  constructor() { }
}
