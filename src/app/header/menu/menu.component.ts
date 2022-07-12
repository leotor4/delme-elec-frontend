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
    this.translate.getTranslation("pt").subscribe((data)=>{
      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.user = user;

        this.items = [
          {
            label: data.global.companyName,
            items: [
              {label: data.global.NCs, icon: 'pi pi-list', routerLink:'/ncs'},
              {label: data.global.importData, icon: 'pi pi-upload', routerLink:'/ncs/import'},
              {
                label: data.global.dashboards,
                icon: 'pi pi-desktop',
                routerLink:'/dashboards'
              },
              {label: data.global.logout, icon: 'pi pi-sign-out',
                command: () => {
                  this.logout();
                }
              }


            ]
          }

        ];
      }
    })

  }

  logout(): void {
    this.tokenStorageService.signOut();
  }

  changeLanguage(language:string) {
    this.translate.use(language);
  }
}
