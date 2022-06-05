
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TokenStorageService, TOKEN_KEY } from './_services/token-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})

export class AppComponent {
  isLoggedIn = localStorage.getItem(TOKEN_KEY) != null || localStorage.getItem(TOKEN_KEY) != '';

  lang: string = "en";

  subscription: any;


  constructor(tokenStorageService: TokenStorageService, public translate: TranslateService, public primeNGConfig: PrimeNGConfig) {
    tokenStorageService.isLoggedIn.subscribe((value:{isLoged: boolean, cameFromLoggin: boolean}) => {
      this.isLoggedIn = value.isLoged
    });


    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    if (browserLang) {
      this.lang = browserLang.match(/en|pt/) ? browserLang : 'en';
    }
    
    if(this.lang) {
      this.changeLang(this.lang);
    }
    

    this.subscription = this.translate.stream('primeng').subscribe(data => {
        this.primeNGConfig.setTranslation(data);
    });
  }


changeLang(lang: string) {
    this.translate.use(lang);
}
}
