import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule


  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
