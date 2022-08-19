import { Component, HostListener, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import { NonCompliance } from "src/app/models/non-compliance";

import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-dashboards",
  templateUrl: "./dashboards.component.html",
  styleUrls: ["./dashboards.component.css"],
})
export class DashboardsComponent implements OnInit {
  constructor(
    public chartsService: ChartsService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}
  load1 = false;
  load2 = false;
  load3 = false;
  load4 = true;
  atual = 0;
  isReloaded = false;
  getScreenWidth: any;
  height = 450;
  dateList: string[] = [];
  dateInicio = "";
  dateFim = "";
  carregou(): boolean {
    return this.load1 && this.load2 && this.load3 && this.load4;
  }

  getWidth() {
    let largura = this.getScreenWidth;
    if (largura < 700) return 500;
    if (largura < 1000) return 800;
    return 1400;
  }

  onDateChange() {
    let dateInitial = this.stringToDate(this.dateInicio);
    let dateFim = this.stringToDate(this.dateFim);
    console.log(dateInitial);
    console.log(dateFim);
    if (dateInitial > dateFim || dateFim < dateInitial) {
      this.messageService.add({
        severity: "error",
        summary: this.translate.instant("charts.failFilter"),
        life: 3000,
      });
    } else {
      if (
        dateInitial.getMonth() == dateFim.getMonth() &&
        dateInitial.getFullYear() == dateFim.getFullYear()
      ) {
        this.chartsService.ncs = this.chartsService.ncsAux.filter((element) => {
          let date = new Date(element.data_abertura!);
          return (
            date.getMonth() == dateInitial.getMonth() &&
            date.getFullYear() == dateInitial.getFullYear()
          );
        });
      } else {
        this.chartsService.ncs = this.chartsService.ncsAux.filter((element) => {
          let date = new Date(element.data_abertura!);
          return (
            date.getMonth() >= dateInitial.getMonth() &&
            date.getFullYear() >= dateInitial.getFullYear() &&
            date.getMonth() <= dateFim.getMonth() &&
            date.getFullYear() <= dateFim.getFullYear()
          );
        });
      }
      console.log(this.chartsService.ncs.length);
      this.reload();
    }
  }

  stringToDate(date: string): Date {
    let month = date.split("/")[0];
    let year = date.split("/")[1];
    let dateFormatted = new Date(year + "-" + month);
    dateFormatted.setDate(dateFormatted.getDate() + 1);
    return dateFormatted;
  }

  @HostListener("window:resize", ["$event"])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    if (this.getScreenWidth < 700 && this.atual != 500) {
      this.atual = 500;
      this.reload();
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
        this.chartsService.ncs = data.noncompliances.filter(
          (item: NonCompliance) =>
            item.status != "open" 
        );
        this.chartsService.ncsAux = data.noncompliances.filter(
          (item: NonCompliance) =>
            item.status != "open" 
        );

        this.createDateList();
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
          let sectorName = element.name;
          if (sectorName) {
            this.chartsService.sectors.push(sectorName);
          }
        });

        this.load3 = true;
      },
    });
  }

  createDateList() {
    let initialDate = new Date();
    let lastDate = new Date();
    this.chartsService.ncs.forEach((element) => {
      if (element.data_abertura) {
        let date = new Date(element.data_abertura);

        if (date < initialDate) {
          initialDate = date;
        }
      }
    });

    
      this.dateList.push(this.formatDate(initialDate));
    
    


    this.dateInicio = this.formatDate(initialDate);
    while (
      initialDate.getMonth() < lastDate.getMonth() &&
      initialDate.getFullYear() <= lastDate.getFullYear()
    ){
      initialDate.setMonth(initialDate.getMonth()+1)
      this.dateList.push(this.formatDate(initialDate));
    }
      this.dateFim = this.formatDate(lastDate);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "numeric",
    });
  }
}
