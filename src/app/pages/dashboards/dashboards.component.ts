import { DashboardsService } from './dashboards.service';
import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/_services/charts.service';


@Component({
  selector: "app-dashboards",
  templateUrl: "./dashboards.component.html",
  styleUrls: ["./dashboards.component.css"],
})
export class DashboardsComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}
  load1 = false;
  load2 = false;
  carregou():boolean{
    return this.load1 && this.load2;
  }
  ngOnInit(): void {
    this.chartsService.get().subscribe({
      next: (data: any) => {
        this.chartsService.ncs = data.noncompliances;
        this.load1 = true;
      },
    });

    this.chartsService.getProduct().subscribe({
      next: (data: any) => {
       
        this.chartsService.products = data.products;
        this.load2 = true;
      },
    });
  }
}
