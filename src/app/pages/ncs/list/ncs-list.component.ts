import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ConfirmationService,
  FilterMatchMode,
  MessageService,
  PrimeNGConfig,
} from "primeng/api";
import { Table } from "primeng/table";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { NonCompliance } from "src/app/models/non-compliance";

import { NcsListDTO } from "./ncs-list-dto";
import { DashboardsService } from "../../dashboards/dashboards.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { TranslateService } from "@ngx-translate/core";
import { DadosNCComponent } from "../../dialogs/dados-nc/dados-nc.component";
import { DialogService } from "primeng/dynamicdialog";

@Component({
  selector: "app-ncs-list",
  templateUrl: "./ncs-list.component.html",

  styleUrls: ["./ncs-list.component.css"],
  providers: [ConfirmationService, DialogService],
})
export class NcsListComponent implements OnInit {
  viewCards = [1296, 150];
  cardValues: any[] = [];
  gridColor = "ocean";
  gradient: boolean = true;
  view = [500, 300];
  pieValues: any[] = [];

  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = "bottom";
  legendTitle = this.translate.instant("list.sub");

  colorScheme = {
    domain: [
      "rgb(0, 91, 123)",
      "rgb(0, 91, 123)",
      "rgb(0, 91, 123)",
      "rgb(0, 91, 123)",
      "rgb(0, 91, 123)",
      "rgb(0, 91, 123)",
    ],
  };
  cardColor: string = "#00344D";

  lineChartData: any[] = [];

  //********line chart************

  lineChartView: any[] = [810, 350];

  lineChartLegend: boolean = true;
  lineChartShowLabels: boolean = true;
  lineChartAnimations: boolean = true;
  lineChartXAxis: boolean = true;
  lineChartYAxis: boolean = true;
  lineChartShowYAxisLabel: boolean = true;
  lineChartShowXAxisLabel: boolean = true;
  lineChartXAxisLabel: string = this.translate.instant("list.month");
  lineChartYAxisLabel: string = this.translate.instant("list.ncsAmount");
  lineChartTimeline: boolean = true;
  //********line chart************

  @ViewChild("dt") dt: Table;
  listNcs: Array<NcsListDTO> = [];
  listNcsObj: Array<NonCompliance> = [];
  cols: any[];
  first = 0;
  totalRecords = 0;
  rows = 5;

  openNc() {
    this.ncsService.abrirNc().subscribe({
      next: (response: any) => {
        this.messageService.add({
          severity: "success",
          summary: this.translate.instant("list.success"),
          life: 3000,
        });

        this.ncsService.nc.code = response["nonCompliance"]["code"];
        this.ncsService.nc.issuer = response["nonCompliance"]["emissor"];
        this.ncsService.nc.id = response["nonCompliance"]["id"];
        this.ncsService.nc.status = response["nonCompliance"]["status"];

        this.router.navigate(["/ncs/create/", this.ncsService.nc.id]);
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: this.translate.instant("list.fail"),
          life: 3000,
        });
      },
    });
  }

  constructor(
    private router: Router,
    private ncsService: NonComplianceService,
    private route: ActivatedRoute,
    private config: PrimeNGConfig,
    public messageService: MessageService,
    private dashboardService: DashboardsService,
    private confirmationService: ConfirmationService,
    private tokenService: TokenStorageService,
    public translate: TranslateService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.setDataLineChart();
    this.startListNcs("all");
  }

  startListNcs(filterStatus: string) {
    this.ncsService.get().subscribe((data: any) => {
      //this.listNcs.append(data.noncompliances);
      const compliances: Array<NonCompliance> = data.noncompliances;
      this.listNcsObj = data.noncompliances;

      if (compliances?.length > 0) {
        this.listNcs = compliances.map((item: NonCompliance) => {
          return new NcsListDTO(item);
        });
        // this.listNcs = this.listNcs.filter(
        //   (item) =>
        //     item.system_status !== "deleted" && item.system_status != "arquived"
        // );
      }

      this.config.filterMatchModeOptions = {
        text: [
          FilterMatchMode.STARTS_WITH,
          FilterMatchMode.CONTAINS,
          FilterMatchMode.NOT_CONTAINS,
          FilterMatchMode.ENDS_WITH,
          FilterMatchMode.EQUALS,
          FilterMatchMode.NOT_EQUALS,
        ],
        numeric: [
          FilterMatchMode.EQUALS,
          FilterMatchMode.NOT_EQUALS,
          FilterMatchMode.LESS_THAN,
          FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
          FilterMatchMode.GREATER_THAN,
          FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
        ],
        date: [
          FilterMatchMode.DATE_IS,
          FilterMatchMode.DATE_IS_NOT,
          FilterMatchMode.DATE_BEFORE,
          FilterMatchMode.DATE_AFTER,
        ],
      };

      if (filterStatus == "open")
        this.listNcs = this.listNcs.filter((item) => item.status == "open");
      if (filterStatus == "canceled")
        this.listNcs = this.listNcs.filter((item) => item.status == "canceled");
      if (filterStatus == "running")
        this.listNcs = this.listNcs.filter((item) => item.status == "running");
      if (filterStatus == "late")
        this.listNcs = this.listNcs.filter((item) => item.status == "late");

      this.setDataCards(compliances, filterStatus);
      setTimeout(this.setPositionTextCards, 200);

      this.totalRecords = this.listNcs.length;
    });
  }

  setDataCards(compliances: Array<NonCompliance>, filterStatus: string) {
    this.dashboardService.getKpisList(compliances).subscribe((data: any) => {
      this.cardValues = data;
    });

    this.dashboardService
      .getPiesValues(compliances, filterStatus)
      .subscribe((data: any) => {
        this.pieValues = data;
      });
  }

  parseMonthStrToNumber(strMonth: string): string {
    switch (strMonth) {
      case "january":
        return this.translate.instant("primeng.monthNamesShort")[0];
      case "february":
        return this.translate.instant("primeng.monthNamesShort")[1];
      case "march":
        return this.translate.instant("primeng.monthNamesShort")[2];
      case "april":
        return this.translate.instant("primeng.monthNamesShort")[3];
      case "may":
        return this.translate.instant("primeng.monthNamesShort")[4];
      case "june":
        return this.translate.instant("primeng.monthNamesShort")[5];
      case "july":
        return this.translate.instant("primeng.monthNamesShort")[6];
      case "august":
        return this.translate.instant("primeng.monthNamesShort")[7];
      case "september":
        return this.translate.instant("primeng.monthNamesShort")[8];
      case "october":
        return this.translate.instant("primeng.monthNamesShort")[9];
      case "november":
        return this.translate.instant("primeng.monthNamesShort")[10];
      case "december":
        return this.translate.instant("primeng.monthNamesShort")[11];
      default:
        return "0";
    }
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.listNcs ? this.first === this.listNcs.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.listNcs ? this.first === 0 : true;
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  cancelNc(ncDto: NonCompliance) {
    this.confirmationService.confirm({
      message: this.translate.instant("list.cancelNcMsg"),
      header: this.translate.instant("list.cancelNcTitle"),
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        if (ncDto.id) {
          this.ncsService.getById(ncDto.id).subscribe({
            next: (response: any) => {
              this.ncsService.nc = new NonCompliance(response["nc"][0]);

              this.ncsService.nc.status = "canceled";

              this.ncsService.saveNc().subscribe({
                next: (data) => {
                  this.messageService.add({
                    severity: "success",
                    summary: this.translate.instant("cancelNC.success"),
                    life: 3000,
                  });

                  window.location.reload();
                },
                error: (err) => {
                  this.messageService.add({
                    severity: "error",
                    summary: this.translate.instant("cancelNC.error"),
                    life: 3000,
                  });
                },
              });
            },
          });
        }
      },

      reject: () => {
        this.messageService.add({
          severity: "info",
          summary: this.translate.instant("list.cancel"),
          life: 5000,
        });
      },
    });
  }

  edit(idNc: number, status: string) {
    if (status.toUpperCase() != "OPEN") {
      this.router.navigate(["/ncs/about/", idNc]);
    } else {
      var user = this.tokenService.getUser();
      console.log(user);

      var listNcsAux = this.listNcsObj.filter((item) => item.id == idNc);

      var nc = listNcsAux[0];

      console.log(nc.emissor);

      if (user["email"] == nc.emissor?.email || user["role_id"] == 3) {
        if (status.toUpperCase() == "OPEN") {
          this.router.navigate(["/ncs/create/", idNc]);
        }
      } else {
        this.messageService.add({
          severity: "warn",
          summary: this.translate.instant("list.error"),
          life: 5000,
        });
      }
    }
  }

  visualizarInformacoes(nc: NonCompliance) {
    const isOpenNC = nc.status?.toUpperCase() == "OPEN";
    if (isOpenNC) {
      this.messageService.add({
        severity: "info",
        summary: this.translate.instant("list.infoMsg"),
        life: 3000,
      });
    } else {
      const ref = this.dialogService.open(DadosNCComponent, {
        data: { nc: nc },
        showHeader: false,
        width: "60vw",
      });
    }
  }

  setPositionTextCards() {
    let textCards = document
      .getElementsByTagName("ngx-charts-number-card")[0]
      .getElementsByTagName("text");
    let foreignObjects = document
      .getElementsByTagName("ngx-charts-number-card")[0]
      .getElementsByTagName("foreignObject");

    for (var i = 0; i < textCards.length; i++) {
      var valueCard = textCards[i];
      var foreignObject = foreignObjects[i];
      let labelCard = foreignObject.getElementsByTagName("p")[0];

      let divTable = document.getElementById("div-table");
      let width;

      if (divTable) {
        width = divTable.offsetWidth;

        if (width > 1150) {
          valueCard.setAttribute("y", "40");
          valueCard.setAttribute("style", "font-size : 25pt; fill:#D6DEE2;");
          foreignObject.setAttribute("y", "72.5");
          foreignObject.setAttribute("width", "200");
          foreignObject.setAttribute("height", "57.5");
          labelCard.setAttribute("style", "font-size : 15px; color:#D6DEE2;");
        } else if (width > 1000 && width <= 1150) {
          valueCard.setAttribute("y", "40");
          valueCard.setAttribute("style", "font-size : 25pt; fill:#D6DEE2;");
          foreignObject.setAttribute("y", "72.5");
          foreignObject.setAttribute("width", "200");
          foreignObject.setAttribute("height", "57.5");
          labelCard.setAttribute("style", "font-size : 15px; color:#D6DEE2;");
        } else if (width > 800 && width <= 1000) {
          valueCard.setAttribute("y", "40");
          valueCard.setAttribute("style", "font-size : 20pt; fill:#D6DEE2;");
          foreignObject.setAttribute("y", "72.5");
          foreignObject.setAttribute("width", "200");
          foreignObject.setAttribute("height", "57.5");
          labelCard.setAttribute("style", "font-size : 15px; color:#D6DEE2;");
        } else if (width > 600 && width <= 800) {
          valueCard.setAttribute("y", "6");
          valueCard.setAttribute("style", "font-size : 15pt; fill:#D6DEE2;");
          foreignObject.setAttribute("y", "28");
          foreignObject.setAttribute("width", "200");
          foreignObject.setAttribute("height", "57.5");
          labelCard.setAttribute("style", "font-size : 15px; color:#D6DEE2;");
        } else if (width > 400 && width <= 600) {
          valueCard.setAttribute("y", "6");
          valueCard.setAttribute("style", "font-size : 15pt; fill:#D6DEE2;");
          foreignObject.setAttribute("y", "22");
          foreignObject.setAttribute("width", "200");
          foreignObject.setAttribute("height", "57.5");
          labelCard.setAttribute("style", "font-size : 10px; color:#D6DEE2;");
        }
      }
    }
  }

  onSelectCard(event: any) {
    if (event["name"] == this.translate.instant("global.NCsTotal")) {
      this.startListNcs("all");
    }

    if (event["name"] == this.translate.instant("global.ncStatus1")) {
      this.startListNcs("open");
    }

    if (event["name"] == this.translate.instant("global.ncStatus4")) {
      this.startListNcs("late");
    }

    if (event["name"] == this.translate.instant("global.ncStatus3")) {
      this.startListNcs("canceled");
    }

    if (event["name"] == this.translate.instant("global.ncStatus2")) {
      this.startListNcs("running");
    }
  }

  setDataLineChart() {
    this.dashboardService.getTimeLineValues().subscribe((data: any) => {
      var seriesOpen = [];
      var seriesClosed = [];

      var lineChartDataAux = [];

      var cont = 0;
      for (const key in data) {
        cont = cont + 1;
        // if(cont > 6) {
        //   break;
        // }
        if (data.hasOwnProperty(key)) {
          var series = [
            {
              name: this.translate.instant("global.status1"),
              value: `${data[key].Abertas}`,
            },

            {
              name: this.translate.instant("global.status7"),
              value: `${data[key].Fechadas}`,
            },
          ];

          lineChartDataAux.push({
            name: this.parseMonthStrToNumber(`${key}`),
            series: series,
          });
        }
      }

      this.lineChartData = [...lineChartDataAux];
    });
  }

  getFlag(status: string, value: number) {
    var totalNcs = 0;
    for (var i = 0; i < this.pieValues.length; i++) {
      totalNcs = totalNcs + this.pieValues[i].value;
    }

    return ((value / totalNcs) * 100).toFixed(2).toString() + "%";
  }

  onActivate(data: any): void {
    console.log("Activate", JSON.parse(JSON.stringify(data)));
  }

  onResizeBarChart(event: any) {
    //this.lineChartView = [this.getWidthBarGraph(event.target.innerWidth), 350];

    let divTable = document.getElementById("div-table");
    let width;
    if (divTable) {
      width = divTable.offsetWidth;

      if (width * 0.7 < 1000) {
        this.lineChartView = [width * 0.7, 350];
      }
    }
  }

  onResizePizzaChart(event: any) {
    let divTable = document.getElementById("div-table");
    let width;
    if (divTable) {
      width = divTable.offsetWidth;

      if (width * 0.3 < 500) {
        this.view = [width * 0.3, 350];
      }
    }
  }

  onResizeCardChart(event: any) {
    let divCards = document.getElementById("div-cards");
    let divTable = document.getElementById("div-table");
    let width;
    if (divTable) {
      width = divTable.offsetWidth;
      this.viewCards = [width, 150];
    }

    setTimeout(this.setPositionTextCards, 500);
  }

  getTooltip(status: string) {
    return status.toUpperCase() == "OPEN"
      ? this.translate.instant("list.editNcBtn")
      : this.translate.instant("list.moreInfoBtn");
  }
}
