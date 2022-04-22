import { TokenStorageService } from '../../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MenuItem[];
  isLoggedIn = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.username = user.username;

      this.items = [
        {
          label: 'Electroson',
          items: [
              {label: 'Usuários', icon: 'pi pi-users'},
              {label: 'Ncs', icon: 'pi pi-list'},
              {label: 'Importar Dados', icon: 'pi pi-upload'},
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

}