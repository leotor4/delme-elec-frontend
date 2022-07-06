import { DashboardsService } from "./dashboards.service";
import { Component, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import { ThisReceiver } from "@angular/compiler";

@Component({
  selector: "app-dashboards",
  templateUrl: "./dashboards.component.html",
  styleUrls: ["./dashboards.component.css"],
})
export class DashboardsComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}
  load1 = false;
  load2 = false;
  load3 = false;

  carregou(): boolean {
    return this.load1 && this.load2 && this.load3;
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

    this.chartsService.getSector().subscribe({
      next: (data: any) => {
        this.chartsService.sectors = []
        data.sectors.forEach((element: any) => {
          this.chartsService.sectors.push(element.name);
        });

        this.load3 = true;
      },
    });
  }
}
