import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from './../services/settings.service';

declare function customInitFuctions(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {



  constructor(  private settingService: SettingsService,
                private sideBarService: SidebarService) { }

  ngOnInit(): void {
    customInitFuctions();
    this.sideBarService.cargarMenu();

  }

}
