import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-nc-emissor",
  templateUrl: "./nc-emissor.component.html",
  styleUrls: ["./nc-emissor.component.css"],
})
export class NcEmissorComponent implements OnInit {
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

  ordenar() {
    this.single.sort(function (a, b) {
      return a.value - b.value;
    });
  }

  popular() {
    this.quant = [];
    this.single = [];

    for (var i = 0; i < this.tipos.length; i++) {
      this.quant.push(0);
    }
    this.chartsService.ncs.forEach((element) => {
      try {
        if (
          element.emissor &&
          (element.tipos_nc_item == this.tiposNcAtual ||
            this.tiposNcAtual == this.translate.instant("global.all"))
        ) {
          let setor = element.emissor.sector!.name;
          let index = this.tipos.indexOf(setor);
          if (index == -1) {
            this.tipos.push(setor);
            this.quant.push(1);
          } else {
            this.quant[index]++;
          }
        }
      } catch (e) {
       
      }
    });

    for (var i = 0; i < this.tipos.length; i++) {
      this.single.push({
        name: this.tipos[i],
        value: this.quant[i],
      });
    }

    this.ordenar();

    let tipos2: string[] = [];
    let quant2: number[] = [];
    this.single.forEach((element) => {
      tipos2.push(element.name);
      quant2.push(element.value);
    });
    this.graph = {
      data: [
        {
          x: tipos2,
          y: quant2,
          type: "bar",
          name: this.translate.instant("charts.ncsReceived"),
          marker: { color: "rgb(29,104,251)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: { title: "Setores" },
        yaxis: { title: "Quantidade de NCs" },

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
  xAxisLabel = "Setores";
  yAxisLabel = "Quantidade de NC";
  title = "Departamento Emissor x Quantidade de Ncs";
}
