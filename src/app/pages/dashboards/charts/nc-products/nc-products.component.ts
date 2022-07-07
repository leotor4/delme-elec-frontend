import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import momentImported from "moment";
const moment = momentImported;

@Component({
  selector: "app-nc-products",
  templateUrl: "./nc-products.component.html",
  styleUrls: ["./nc-products.component.css"],
})
export class NcProductsComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}
  @Input() size: number[] = [];
  display = true;
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  onSelect(event: any) {}
  setor = "Todos";
  setoresAux: string[] = [];
  meses: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  mesesGrafico: string[] = [];
  mesesGraficoNum: number[] = [];
  quantMeses: number[] = [];
  quantProdutos: number[] = [];
  graph: any;
  title = "Número de Ncs x Custo Total";

  popular() {
    let date = new Date();
    this.quantMeses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.quantProdutos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.chartsService.ncs.forEach((element) => {
      let ncDate = new Date(element.data_abertura!);
      let ncMes = ncDate.getMonth();
      if (
        ncDate.getFullYear() == date.getFullYear() &&
        (this.setor == element.tipos_local_item || this.setor == "Todos")
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
          type: "bar",
          name: "Quantidade de Produtos",
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.meses,
          y: this.quantMeses,
          name: "Quantidade de NCs",
          type: "scatter",
          marker: { color: "rgb(252,134,43)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: { title: "Ano" },
        yaxis: { title: "Quantidade de Produtos" },
        title: "",
      },
    };
  }

  popularSetores() {
    this.setoresAux = Object.assign([], this.chartsService.sectors);
    this.setoresAux.unshift("Todos");
    this.setor = "Todos";
  }
}
