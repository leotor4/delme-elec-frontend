import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationService, FilterMatchMode, MessageService, PrimeNGConfig } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { Table } from "primeng/table";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { NonCompliance } from "src/app/models/non-compliance";

import { DashboardsService } from "../../dashboards/dashboards.service";
import { DadosNCComponent } from "../../dialogs/dados-nc/dados-nc.component";
import { NcsListDTO } from "./ncs-list-dto";



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
  view = [492, 300];
  pieValues: any[] = [];
  graph: any;

  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = false;
  legendPosition: string = "bottom";
  legendTitle = this.translate.instant("list.sub");

  colorScheme = {
    domain: [
      "rgb(125, 249, 255)",
      "rgb(124, 252, 0)",
      "rgb(238, 75, 43)",
      "rgb(255,255,0)",
      "rgb(128, 128, 128)",
    ],
  };

  colorScheme2 = {
    domain: [],
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
  listNcsAux: Array<NcsListDTO> = [];
  listNcsObj: Array<NonCompliance> = [];
  setores: String[] = [];
  noPrazo: number[] = [];
  atrasado: number[] = [];
  elaborado: number[] = [];
  cols: any[];
  first = 0;
  totalRecords = 0;
  rows = 5;

  haveOpenNc(): number {
    let n = -1;
    let user = this.tokenService.getUser();
    this.listNcsObj.forEach((nc) => {
      if (nc.emissor?.id == user.id && nc.status == "open") {
        n = nc.id!;
      }
    });
    return n;
  }
  openNc() {
    let openNc = this.haveOpenNc();
    console.log("id:" + openNc);
    if (openNc == -1) {
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
    } else {
      this.router.navigate(["/ncs/create/", openNc]);
    }
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
    this.graph = {
      data: [
        {
          x: [],
          y: [],
          type: "bar",
          name: "",
          marker: { color: "rgb(252,134,43)" },
        },
      ],
      layout: {
        xaxis: {
          autotick: false,
          title: this.translate.instant("charts.year"),
        },

        yaxis: { title: "" },
      },
    };

    this.onResizeCardChart("");
    this.onResizePizzaChart("");
  }

  isLate(nc: NonCompliance): boolean {
    let dataAbertura = new Date(nc.data_abertura!);
    let now = new Date();
    let daysDiff = now.getDate() - dataAbertura.getDate();
    if (daysDiff >= 14) return true;
    return false;
  }

  popular(ncs: NonCompliance[]) {
    this.setores = [];
    this.elaborado = [];
    this.atrasado = [];
    this.noPrazo = [];

    ncs.forEach((element) => {
      let setor = element.tipos_local_item;
      let proposta = element.proposalSolution;
      if (setor && element.status != "closed") {
        let index = this.setores.indexOf(setor);
        if (index == -1) {
          this.setores.push(setor);
          this.elaborado.push(0);
          this.noPrazo.push(0);
          this.atrasado.push(0);
          index = this.setores.indexOf(setor);
        }

        if (proposta) {
          if (proposta!.status == "complete") {
            this.elaborado[index]++;
          }
        } else if (this.isLate(element)) {
          this.atrasado[index]++;
        } else {
          this.noPrazo[index]++;
        }
      }
    });

    this.graph = {
      data: [
        {
          x: this.setores,
          y: this.elaborado,
          type: "bar",
          name: this.translate.instant("global.status13"),
          marker: { color: "rgb(124, 252, 0)" },
        },
        {
          x: this.setores,
          y: this.noPrazo,
          type: "bar",
          name: this.translate.instant("global.status12"),
          marker: { color: "rgb(255,255,0)" },
        },
        {
          x: this.setores,
          y: this.atrasado,
          type: "bar",
          name: this.translate.instant("global.status3"),
          marker: { color: "rgb(238, 75, 43)" },
        },
      ],
      layout: {
        width: 804,
        height: 500,
        title: "Status da Proposta de Solução",
        xaxis: {
          autotick: false,
          title: "",
        },

        yaxis: { title: "" },
      },
    };
  }

  startListNcs(filterStatus: string) {
    this.ncsService.get().subscribe((data: any) => {
      this.popular(data.noncompliances);
      //this.listNcs.append(data.noncompliances);
      var compliances: Array<NonCompliance> = data.noncompliances;
      this.listNcsObj = data.noncompliances;

      compliances = compliances.filter((item) => item.status != "open");

      if (compliances?.length > 0) {
        this.listNcs = compliances.map((item: NonCompliance) => {
          return new NcsListDTO(item);
        });

        this.listNcsAux = compliances.map((item: NonCompliance) => {
          return new NcsListDTO(item);
        });
        for (let i = 0; i < this.listNcs.length; i++) {
          switch (this.listNcs[i].status) {
            case "open":
              this.listNcs[i].status = this.translate.instant("global.status1");
              break;
            case "running":
              this.listNcs[i].status = this.translate.instant("global.status2");
              break;
            case "late":
              this.listNcs[i].status = this.translate.instant("global.status3");
              break;
            case "deleted":
              this.listNcs[i].status = this.translate.instant("global.status4");
              break;
            case "archived":
              this.listNcs[i].status = this.translate.instant("global.status5");
              break;
            case "canceled":
              this.listNcs[i].status = this.translate.instant("global.status6");
              break;
            case "closed":
              this.listNcs[i].status = this.translate.instant("global.status7");
              break;
            default:
              //
              break;
          }
        }
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

      if (filterStatus == "canceled")
        this.listNcs = this.listNcs.filter(
          (item) => item.status == this.translate.instant("global.status6")
        );
      if (filterStatus == "running")
        this.listNcs = this.listNcs.filter(
          (item) => item.status == this.translate.instant("global.status2")
        );
      if (filterStatus == "close")
        this.listNcs = this.listNcs.filter(
          (item) => item.status == this.translate.instant("global.status7")
        );
      if (filterStatus == "late")
        this.listNcs = this.listNcs.filter(
          (item) => item.status == this.translate.instant("global.status3")
        );

      this.listNcs = this.listNcs.filter((item) => item.status != "open");
      this.setDataCards(compliances, filterStatus);
      setTimeout(this.setPositionTextCards, 200);

      this.totalRecords = this.listNcs.length;
      this.onResizeBarChart("");
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

    let colors: any = [];
    this.pieValues.forEach((element) => {
      if (element.name == this.translate.instant("global.canceled")) {
        colors.push("rgb(128, 128, 128)");
      }
      if (element.name == this.translate.instant("global.late")) {
        colors.push("rgb(238, 75, 43)");
      }
      if (element.name == this.translate.instant("global.status2")) {
        colors.push("rgb(255,255,0)");
      }
      if (element.name == this.translate.instant("global.status7")) {
        colors.push("rgb(124, 252, 0)");
      }
    });

    this.colorScheme2.domain = colors;

    console.log("teste");
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
    if (ncDto.status == "canceled") {
      this.messageService.add({
        severity: "info",
        summary: this.translate.instant("cancelNC.failtToCancel"),
        life: 3000,
      });
    } else {
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
  }

  edit(idNc: number, status: string) {
    if (status != this.translate.instant("global.status1")) {
      this.router.navigate(["/ncs/about/", idNc]);
    } else {
      var user = this.tokenService.getUser();

      var listNcsAux = this.listNcsObj.filter((item) => item.id == idNc);

      var nc = listNcsAux[0];

      if (user["email"] == nc.emissor?.email || user["role_id"] == 3) {
        if (status == this.translate.instant("global.status1")) {
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
        closable: true,
        dismissableMask: true,
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
      this.startListNcs("close");
    }

    if (event["name"] == this.translate.instant("global.ncStatus4")) {
      this.startListNcs("late");
    }

    if (event["name"] == this.translate.instant("global.ncStatus3")) {
      this.startListNcs("canceled");
    }

    if (event["name"] == this.translate.instant("global.status2")) {
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
    //  this.lineChartView = [this.getWidthBarGraph(event.target.innerWidth), 350];

    let divTable = document.getElementById("div-table");
    let width;
    if (divTable) {
      width = divTable.offsetWidth;
      var teste = width * 0.62;
      if (width * 0.62 < 804) {
        this.lineChartView = [width * 0.7, 350];

        this.graph.layout.width = width * 0.62;
        this.graph.layout.height = 500;
      }
    }
  }

  onResizePizzaChart(event: any) {
    let divTable = document.getElementById("div-table");
    let width;
    if (divTable) {
      width = divTable.offsetWidth;

      if (width * 0.38 < 500) {
        this.view = [width * 0.38, 350];
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
