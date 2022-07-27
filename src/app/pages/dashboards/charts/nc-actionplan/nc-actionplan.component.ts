import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-nc-actionplan",
  templateUrl: "./nc-actionplan.component.html",
  styleUrls: ["./nc-actionplan.component.css"],
})
export class NcActionplanComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.tipos = Object.assign([], this.chartsService.sectors);
    this.popular();
  }

  single: any[] = [];
  multi: any[] = [];
  tipos: string[] = [];
  graph: any;
  tiposNc: string[] = [
    this.translate.instant("global.all"),
    this.translate.instant("newNC.step1.ncType.type1"),
    this.translate.instant("newNC.step1.ncType.type2"),
    this.translate.instant("newNC.step1.ncType.type3"),
    this.translate.instant("newNC.step1.ncType.type4"),
    this.translate.instant("newNC.step1.ncType.type5"),
    this.translate.instant("newNC.step1.ncType.type6"),
  ];
  tiposNcAtual = this.translate.instant("global.all");

  atrasado: number[] = [];
  cancelado: number[] = [];
  execucao: number[] = [];
  concluido: number[] = [];
  ncs: number[] = [];

  ordenar() {
    this.multi.sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  popular() {
    this.atrasado = [];
    this.cancelado = [];
    this.execucao = [];
    this.concluido = [];
    this.ncs = [];
    this.multi = [];

    for (let i = 0; i < this.tipos.length; i++) {
      this.cancelado.push(0);
      this.atrasado.push(0);
      this.execucao.push(0);
      this.concluido.push(0);
      this.ncs.push(0);
    }
    this.chartsService.ncs.forEach((element) => {
      if (
        element.tipos_local_item &&
        (element.tipos_nc_item == this.tiposNcAtual ||
          this.tiposNcAtual == this.translate.instant("global.all"))
      ) {
        let planos = element.proposalSolution?.actionPlans;
        let index = this.tipos.indexOf(element.tipos_local_item);
        this.ncs[index]++;
        planos?.forEach((element) => {
          switch (element.status) {
            case this.translate.instant("global.status3"):
              this.atrasado[index]++;
              break;
            case this.translate.instant("global.status2"):
              this.execucao[index]++;
              break;
            case this.translate.instant("createProp.step2.status4"):
              this.concluido[index]++;
              break;
            case this.translate.instant("global.status6"):
              this.cancelado[index]++;
              break;
          }
        });
      }
    });

    this.ordenar();
    this.graph = {
      data: [
        {
          x: this.tipos,
          y: this.execucao,
          type: "bar",
          name: this.translate.instant("global.status2"),
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.tipos,
          y: this.concluido,
          name: this.translate.instant("global.status8"),
          type: "bar",
          marker: { color: "rgb(51,192,252)" },
        },
        {
          x: this.tipos,
          y: this.atrasado,
          name: this.translate.instant("global.status9"),
          type: "bar",
          marker: { color: "rgb(74,255,254)" },
        },

        {
          x: this.tipos,
          y: this.cancelado,
          name: this.translate.instant("global.status10"),
          type: "bar",
          marker: { color: "rgb(175,255,255)" },
        },
        {
          x: this.tipos,
          y: this.ncs,
          name: this.translate.instant("charts.ncAmount"),
          type: "scatter",
          yaxis: "y2",
          marker: { color: "rgb(252,134,43)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        title: "",
        xaxis: {
          autotick: false,
          title: this.translate.instant("charts.sectors"),
        },
        yaxis2: {
          overlaying: "y",
          side: "right",
          showgrid: false,
          zeroline: false,
          title: this.translate.instant("charts.title11"),
        },

        yaxis: { title: this.translate.instant("charts.amountActions") },
      },
    };
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = "";
  yAxisLabel = "";
  title = this.translate.instant("charts.title2");
}
