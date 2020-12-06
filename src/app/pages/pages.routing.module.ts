import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AuthGuard } from './../guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimiento/hospitales/hospitales.component';
import { MedicoComponent } from './mantenimiento/medicos/medico.component';
import { MedicosComponent } from './mantenimiento/medicos/medicos.component';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RouterModule, Routes } from '@angular/router';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './mantenimiento/usuarios/usuarios.component';

// Pages

// Pages/Mantenimiento

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          { path: '',  component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'progress',   component: ProgressComponent, data: {titulo: 'ProgressBar'} },
          { path: 'grafica1',   component: Grafica1Component, data: {titulo: 'Gráficas'} },
          { path: 'account-settings',   component: AccountSettingsComponent, data: {titulo: 'Configuración de cuentas'} },
          { path: 'promesas',   component: PromesasComponent, data: {titulo: 'Promesas'} },
          { path: 'rxjs',   component: RxjsComponent, data: {titulo: 'RxJs'} },
          { path: 'perfil',   component: PerfilComponent, data: {titulo: 'Perfil'} },

          // Mantenimientos

          { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Usuarios'} },
          { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Hospitales'} },
          { path: 'medicos', component: MedicosComponent, data: {titulo: 'Medicos Component'} },
          { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Medico'} },

        ]
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
