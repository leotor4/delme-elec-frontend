import { Component, Input, OnInit } from "@angular/core";
import { CostsComponent } from "src/app/pages/ncs/about/costs/costs.component";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-nc-year",
  templateUrl: "./nc-year.component.html",
  styleUrls: ["./nc-year.component.css"],
})
export class NcYearComponent implements OnInit {
  constructor(public chartsService: ChartsService, public translate: TranslateService) {}
  @Input() size: number[] = [];

  ngOnInit(): void {
    this.popular();
  }

  onSelect(event: any) {}

  anos: number[] = [];
  quantAnos: number[] = [];
  quantCusto: number[] = [];

  popular() {
    this.chartsService.ncs.forEach((element) => {
      if (element.data_abertura) {
        let data = new Date(element.data_abertura);
        let ano = data.getFullYear();
        let index = this.anos.indexOf(ano);
        if (index == -1) {
          this.anos.push(ano);
          this.quantAnos.push(1);
          this.quantCusto.push(0);
        } else {
          this.quantAnos[index]++;
        }

        if (element.costs) {
          index = this.anos.indexOf(ano);
          let custos = element.costs;
          let somatorio = 0;
          custos.forEach((element) => {
            let value = parseFloat(element.value);
            if (value) {
              somatorio += value;
            }
          });
          index = this.anos.indexOf(ano);
          this.quantCusto[index] += somatorio;
        }
      }
    });
  }

  graph = {
    data: [
      {
        x: this.anos,
        y: this.quantCusto,
        type: "scatter",
        name: this.translate.instant("charts.cost2"),
        marker: { color: "rgb(252,134,43)" },
      },
      {
        x: this.anos,
        y: this.quantAnos,
        name: this.translate.instant("charts.amount"),
        type: "bar",
        marker: { color: "rgb(29,104,251)" },
      },
    ],
    layout: {
      width: 1600,
      height: 500,
    },
  };
}
