import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

 public label1:string[] = ['Descargar Ventas', 'Ventas en Almacén', 'Ventas en Orden'];
 public data1 = [
  [500, 200, 200]
];

public label2:string[] = ['Ingresos por Ventas', 'Ingreso por Servicios', 'Ingresos Pasivos'];
public data2 = [
 [500, 200, 200]
];

public label3:string[] = ['Costos Ventas', 'Costos en Almacén', 'Costos en Orden'];
public data3 = [
 [50, 800, 50]
];

public label4:string[] = ['Perdidas Ventas', 'Perdidas en Almacén', 'Perdidas en Orden'];
public data4 = [
 [300, 300, 300]
];
}
