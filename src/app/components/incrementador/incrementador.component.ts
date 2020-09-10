import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit{
  
  
  ngOnInit() {
    this.btnClass = `btn ${this.btnClass}`;
  }
  
  @Input('valor') progress:number = 50; //La palabra valor es un alias que le ponemos a la variable que vamos a recibir del padre
  //@Input() progress:number = 50;
  @Input() btnClass:string = 'btn-primary';


  @Output('valor') valorSalida:EventEmitter<number> = new EventEmitter();

  get getPorcentaje(){
    return `${this.progress}%`;
  }
  
  cambiarValor( valor:number ){
  
    if(this.progress >= 100 && valor >= 0){

      this.valorSalida.emit(100);
      return this.progress = 100;
    }
  
    if(this.progress <= 0 && valor <= 0){

      this.valorSalida.emit(0);
      return this.progress = 0;
    }
  
    this.progress += valor;
    this.valorSalida.emit(this.progress);
  }

  onChange( nuevoValor:number ){

    if(nuevoValor >= 100){
      this.progress = 100;
    }else if(nuevoValor <= 0){
      this.progress = 0;
    }else{
      this.progress = nuevoValor;
    }

    this.valorSalida.emit(this.progress);

  }

}
