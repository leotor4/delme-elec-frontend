import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-nc-receptor-emissor",
  templateUrl: "./nc-receptor-emissor.component.html",
  styleUrls: ["./nc-receptor-emissor.component.css"],
})
export class NcReceptorEmissorComponent implements OnInit {
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
  quant: number[] = [];
  quantEmissor: number[] = [];

  ordenar() {
    this.multi.sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  popular() {
    this.quant = [];
    this.quantEmissor = [];
    this.multi = [];

    for (var i = 0; i < this.tipos.length; i++) {
      this.quant.push(0);
      this.quantEmissor.push(0);
    }
    this.chartsService.ncs.forEach((element) => {
      if (
        element.tipos_local_item &&
        (element.tipos_nc_item == this.tiposNcAtual ||
          this.tiposNcAtual == this.translate.instant("global.all"))
      ) {
        let setorReceptor = element.tipos_local_item;
        let setorEmissor = element.emissor?.sector?.name;

        let index = this.tipos.indexOf(setorReceptor);
        if (index == -1) {
          this.tipos.push(setorReceptor);
          this.quant.push(1);
        } else {
          this.quant[index]++;
        }

        index = this.tipos.indexOf(setorEmissor!);
        if (index == -1) {
          this.tipos.push(setorReceptor);
          this.quantEmissor.push(1);
        } else {
          this.quantEmissor[index]++;
        }
      }
    });

    for (var i = 0; i < 19; i++) {
      this.multi.push({
        name: this.tipos[i],
        series: [
          {
            name: this.translate.instant("charts.ncsReceived"),
            value: this.quant[i],
          },
          {
            name: this.translate.instant("charts.ncsSent"),
            value: this.quant[i],
          },
        ],
      });
    }
    this.ordenar();
    this.graph = {
      data: [
        {
          x: this.tipos,
          y: this.quant,
          type: "bar",
          name: this.translate.instant("charts.ncsReceived"),
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.tipos,
          y: this.quantEmissor,
          name: this.translate.instant("charts.ncsSent"),
          type: "bar",
          marker: { color: "rgb(51,192,252)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: { title: "Setores" },
        yaxis: { title: "Custo" },
        autosize: true,
        title: "",
      },
      config: { responsive: true },
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
  title = this.translate.instant("charts.title7");
}
