import { BusquedaComponent } from './busqueda/busqueda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from './../components/components.module';


import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

// Mantenimientos
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { PagesRoutingModule } from './pages.routing.module';

// Pipes
import { PipesModule } from './../pipes/pipes.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    BusquedaComponent
  ]
})
export class PagesModule { }
