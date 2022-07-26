import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-cost-sector",
  templateUrl: "./cost-sector.component.html",
  styleUrls: ["./cost-sector.component.css"],
})
export class CostSectorComponent implements OnInit {
 
  @Input() size: number[] = [];
  constructor(public chartsService: ChartsService, public translate: TranslateService) {}
  display = true;
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  onSelect(event: any) {}
  setor = this.translate.instant("global.all");
  setores: string[] = [];
  setoresAux: string[] = [];
  quantAnos: number[] = [];
  quantCusto: number[] = [];
  graph: any;
  title = this.translate.instant("charts.title1")

  popular() {
    this.setores = [];
    this.quantAnos = [];
    this.quantCusto = [];
    this.chartsService.sectors.forEach((element) => {
      if (element == this.setor || this.setor == this.translate.instant("global.all")) {
        this.setores.push(element);
        this.quantAnos.push(0);
        this.quantCusto.push(0);
      }
    });
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_local_item) {
        let setor = element.tipos_local_item;

        let index = this.setores.indexOf(setor);

        if (index > -1) {
          this.quantAnos[index]++;
        } else {
        }

        if (element.costs) {
          index = this.setores.indexOf(setor);
          let custos = element.costs;
          let somatorio = 0;
          custos.forEach((element) => {
            let value = parseFloat(element.value);
            if (value) {
              somatorio += value;
            }
          });
          index = this.setores.indexOf(setor);
          this.quantCusto[index] += somatorio;
        }
      }
    });

    this.graph = {
      data: [
        {
          x: this.setores,
          y: this.quantAnos,
          name: this.translate.instant("charts.amount"),
          type: "bar",
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.setores,
          y: this.quantCusto,
          type: "scatter",
          yaxis: "y2",
          name: this.translate.instant("charts.cost"),
          marker: { color: "rgb(252,134,43)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: {
          autotick: false,
          title: this.translate.instant("charts.sector"),
        },

       
        yaxis2: this.chartsService.yaxisConfig,
        yaxis: { title: this.translate.instant("charts.subtitle1") },
        title: "",
      },
    };
  }

  popularSetores() {
    this.setoresAux = Object.assign([], this.chartsService.sectors);
    this.setoresAux.unshift(this.translate.instant("global.all"));
    this.setor = this.translate.instant("global.all");
    this.setoresAux.push(this.translate.instant("global.all"));
    this.setor = this.translate.instant("global.all");
  }
}
