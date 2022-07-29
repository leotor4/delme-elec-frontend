import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-nc-count",
  templateUrl: "./nc-count.component.html",
  styleUrls: ["./nc-count.component.css"],
})
export class NcCountComponent implements OnInit {
  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService
  ) {}
  @Input() size: number[] = [];

  ngOnInit(): void {
    this.popular();
  }

  onSelect(event: any) {}

  anos: number[] = [];
  quantAnos: number[] = [];
  quantCusto: number[] = [];
  labels: string[] = [];
  graph: any;

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
    this.anos.forEach((element) => {
      let indexAtual = this.anos.indexOf(element);
      let indexAnterior = this.anos.indexOf(element - 1);
      let value = 0;
      if (indexAnterior != -1) {
        value = (this.quantAnos[indexAtual]  - this.quantAnos[indexAnterior]) * 100 / this.quantAnos[indexAnterior]
      }
      this.labels[indexAtual] = value.toString() + "%"
    });
   
    this.graph = {
      data: [
        {
          x: this.anos,
          y: this.quantAnos,
          mode: "lines+markers+text",
          textposition: "top",
          text: this.labels,
          type: "scatter",
          name: this.translate.instant("charts.ncAmount"),
          marker: { color: "rgb(252,134,43)" },
        },
      ],
      layout: {
        width: 1600,
        height: 500,
        xaxis: {
          autotick: false,
          title: this.translate.instant("charts.year"),
        },

        yaxis: { title: this.translate.instant("charts.ncAmount") },
      },
    };
  }
}
