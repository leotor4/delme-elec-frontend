import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import momentImported from "moment";
import { TranslateService } from "@ngx-translate/core";
const moment = momentImported;

@Component({
  selector: "app-nc-products",
  templateUrl: "./nc-products.component.html",
  styleUrls: ["./nc-products.component.css"],
})
export class NcProductsComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService
  ) {}
  display = true;
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  onSelect(event: any) {}
  setor = this.translate.instant("global.all");
  setoresAux: string[] = [];
  meses: string[] = this.translate.instant("primeng.monthNames");
  mesesGrafico: string[] = [];
  mesesGraficoNum: number[] = [];
  quantMeses: number[] = [];
  quantProdutos: number[] = [];
  graph: any;
  title = this.translate.instant("charts.title5");

  popular() {
    let date = new Date();
    this.quantMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.quantProdutos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.chartsService.ncs.forEach((element) => {
      let ncDate = new Date(element.data_abertura!);
      let ncMes = ncDate.getMonth();
      if (
        ncDate.getFullYear() == date.getFullYear() &&
        (this.setor == element.tipos_local_item ||
          this.setor == this.translate.instant("global.all"))
      ) {
        this.quantMeses[ncMes]++;

        if (element.quant_nc) {
          this.quantProdutos[ncMes] += element.quant_nc;
        }
      }
    });

    this.graph = {
      data: [
        {
          x: this.meses,
          y: this.quantProdutos,
          text: this.quantProdutos.map(String),
          textposition: "auto",
          type: "bar",
          name: this.translate.instant("charts.products"),
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.meses,
          y: this.quantMeses,
          mode: "lines+markers+text",
          textposition: "top",
          text: this.quantMeses.map(String),

          name: this.translate.instant("charts.ncAmount"),
          type: "scatter",
          yaxis: "y2",
          marker: { color: "rgb(252,134,43)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        yaxis2: {
          overlaying: "y",
          side: "right",
          showgrid: false,
          zeroline: false,
          title: this.translate.instant("charts.title11"),
        },
        xaxis: { title: this.translate.instant("charts.year") },
        yaxis: { title: this.translate.instant("charts.products") },
        title: "",
      },
    };
  }

  popularSetores() {
    this.setoresAux = Object.assign([], this.chartsService.sectors);
    this.setoresAux.unshift(this.translate.instant("global.all"));
    this.setor = this.translate.instant("global.all");
  }
}
