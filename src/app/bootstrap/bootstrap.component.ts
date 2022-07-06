import { TokenStorageService } from '../_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ChartsService } from '../_services/charts.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent implements OnInit {


  constructor(private router: Router, private tokenStorageService : TokenStorageService,public chartsService:ChartsService) {}

  ngOnInit(): void {
    this.tokenStorageService.isLoggedIn.subscribe((value:{isLoged: boolean, cameFromLoggin: boolean}) => {
      if(value.cameFromLoggin && value.isLoged) {
          this.router.navigate(['/ncs']);
      }
    });
  }

}
