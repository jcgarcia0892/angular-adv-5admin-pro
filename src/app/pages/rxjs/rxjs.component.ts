import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription} from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {

    /*this.retornaObservable().pipe(
      retry(1)
    ).subscribe( 
      (valor) => console.log('next', valor),
      (err) => console.log('error', err),
      () => console.log('completado'));*/

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);

  }

  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {

    return interval(500).pipe(
      map((valor) => {
        return valor + 1;
      }),
      filter((valor) => valor % 2 === 0),
      take(10),
    );

  

  }

  retornaObservable(): Observable<number> {

    let i = -1;

    return new Observable<number>(observer => {


      let intervalo = setInterval(()=> {

        i++;
        observer.next(i);

        if(i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        if(i==2){
          observer.error('Llego al valor de 2');
        }

      }, 1000);

    });
  }


}
