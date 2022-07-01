import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

import { TokenStorageService } from '../../_services/token-storage.service';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  isLoggedIn = false;
  
  user: User;

  constructor(private tokenStorageService: TokenStorageService, public translate: TranslateService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.user = user;

      this.items = [
        {
          label: 'Electroson Brasil',
          items: [
              {label: 'Ncs', icon: 'pi pi-list', routerLink:'/ncs'},
              {label: 'Importar Dados', icon: 'pi pi-upload', routerLink:'/ncs/import'},
              {
                label: 'Dashboards', 
                icon: 'pi pi-desktop',
                items: [
                  {label:'Bar Chart', icon: 'pi pi-chart-bar', routerLink:'/dashboards/bar-chart'},
                  {label:'Grouped Bar Chart', icon: 'pi pi-chart-bar', routerLink:'/dashboards'}

                ] 
                
              },
              {label: 'Sair', icon: 'pi pi-sign-out',
                command: () => {
                  this.logout();
                }
              }


          ]
        }

      ];
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
  }

  changeLanguage(language:string) {
    this.translate.use(language);
  }
}
