import { DashboardsService } from './dashboards.service';
import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/_services/charts.service';


@Component({
  selector: "app-dashboards",
  templateUrl: "./dashboards.component.html",
  styleUrls: ["./dashboards.component.css"],
})
export class DashboardsComponent implements OnInit {
  constructor(
    public chartsService: ChartsService
  ) {}
carregou = false
  ngOnInit(): void {
     this.chartsService.get().subscribe({
       next: (data:any) => {
         this.chartsService.ncs = data.noncompliances;
         this.carregou = true;
       },
     });
  }
}
