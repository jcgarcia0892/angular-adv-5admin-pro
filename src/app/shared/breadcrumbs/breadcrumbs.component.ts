import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  titulo: string;
  tituloSubs$: Subscription;

  constructor(  private router:Router) {

    this.tituloSubs$ = this.getArgumentoRuta()
                          .subscribe(({titulo}) => {
                            this.titulo = titulo;
                            document.title = `Adminpro - ${titulo} `;
                          })


  }

  ngOnDestroy() {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentoRuta() {
    return this.router.events
      .pipe(
        filter((data) => data instanceof ActivationEnd),
        filter( (data: ActivationEnd) => data.snapshot.firstChild === null ),
        map( (data: ActivationEnd) => data.snapshot.data )
      );
    
  }

}
