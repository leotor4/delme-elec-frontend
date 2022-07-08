import { DashboardsService } from "./dashboards.service";
import { Component, HostListener, OnInit } from "@angular/core";
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
  load4 = true;
  atual = 0;
  isReloaded = false;
  getScreenWidth: any;

  carregou(): boolean {
    return this.load1 && this.load2 && this.load3 && this.load4;
  }

  getWidth() {
    let largura = this.getScreenWidth;
    if (largura < 700) return 500;
    if (largura < 1000) return 800;
    return 1400;
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
     if (this.getScreenWidth < 700 && this.atual !=500) {
      this.atual = 500;
      this.reload()
     }

     if (this.getScreenWidth < 1000 && this.atual != 800) {
        this.atual = 800;
        this.reload();
     }

     if (this.getScreenWidth > 1000 && this.atual != 1400) {
       this.atual = 1400;
       this.reload();
     }
     
    
  }
  reload() {
    if (!this.isReloaded) {
      this.load4 = false;
      setTimeout(() => {
        this.load4 = true;
      }, 200);
    }
  }

  ngOnInit(): void {
    this.getScreenWidth = window.innerWidth;
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
        this.chartsService.sectors = [];
        data.sectors.forEach((element: any) => {
          this.chartsService.sectors.push(element.name);
        });

        this.load3 = true;
      },
    });
  }
}
