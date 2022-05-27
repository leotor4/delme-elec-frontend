import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';

import { FechamentoDialogComponent } from './pages/dialogs/fechamento-dialog/fechamento-dialog.component';
import { TokenStorageService, TOKEN_KEY } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  isLoggedIn = localStorage.getItem(TOKEN_KEY) != null || localStorage.getItem(TOKEN_KEY) != '';

  
  constructor(private dialogService:DialogService,tokenStorageService: TokenStorageService) {
    tokenStorageService.isLoggedIn.subscribe((value:{isLoged: boolean, cameFromLoggin: boolean}) => {
      this.isLoggedIn = value.isLoged
    });
  }
}
