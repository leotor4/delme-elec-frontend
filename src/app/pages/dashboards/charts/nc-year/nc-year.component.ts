import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-nc-year",
  templateUrl: "./nc-year.component.html",
  styleUrls: ["./nc-year.component.css"],
})
export class NcYearComponent implements OnInit {
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
    
    this.graph = {
      data: [
        {
          x: this.anos,
          y: this.quantCusto,
          type: "scatter",
          text: this.quantCusto.map(String),
          mode: "lines+markers+text",
          textposition: "top",
          yaxis: "y2",
          name: "Custo",
          marker: { color: "rgb(252,134,43)" },
        },
        {
          x: this.anos,
          y: this.quantAnos,
          text: this.quantAnos.map(String),
          textposition: "auto",
          name: "Quantidade",
          type: "bar",
          marker: { color: "rgb(29,104,251)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: {
          autotick: false,
          title: this.translate.instant("charts.year"),
        },
        yaxis2: {
          overlaying: "y",
          side: "right",
          showgrid: false,
          zeroline: false,
          title: this.translate.instant("charts.subtitle2"),
        },

        yaxis: { title: this.translate.instant("charts.title11") },
      },
    };
  }
}
