import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminGuard } from './../guards/admin.guard';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';

import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const childRoutes: Routes = [
  { path: '',  component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'account-settings',   component: AccountSettingsComponent, data: {titulo: 'Configuración de cuentas'} },
  { path: 'buscar/:termino',   component: BusquedaComponent, data: {titulo: 'Busquedas'} },
  { path: 'grafica1',   component: Grafica1Component, data: {titulo: 'Gráficas'} },
  { path: 'perfil',   component: PerfilComponent, data: {titulo: 'Perfil'} },
  { path: 'progress',   component: ProgressComponent, data: {titulo: 'ProgressBar'} },
  { path: 'promesas',   component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'rxjs',   component: RxjsComponent, data: {titulo: 'RxJs'} },

  // Mantenimientos

  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos Component'} },
  { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medico'} },
    // Solo Usuarios con un rol Admin pueden ver esta página
  { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: {titulo: 'Usuarios'} },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
