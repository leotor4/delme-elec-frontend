import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-receptor-emissor",
  templateUrl: "./nc-receptor-emissor.component.html",
  styleUrls: ["./nc-receptor-emissor.component.css"],
})
export class NcReceptorEmissorComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(public chartsService: ChartsService) {}
  ngOnInit(): void {
    this.tipos = Object.assign([], this.chartsService.sectors);
    this.popular();
    console.log(this.graph);
  }

  single: any[] = [];
  multi: any[] = [];
  tipos: string[] = [];
  graph: any;
  tiposNc: string[] = [
    "Auditoria Interna",
    "Auditoria Externa",
    "NC de Fornecedor",
    "NC de Processo",
    "NC de Cliente",
    "NC de Produto",
    "Todos",
  ];
  tiposNcAtual = "Todos";
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
          this.tiposNcAtual == "Todos")
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
            name: "Ncs recebidas",
            value: this.quant[i],
          },
          {
            name: "Ncs emitidas",
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
          name: "Custo",
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.tipos,
          y: this.quantEmissor,
          name: "Quantidade",
          type: "bar",
          marker: { color: "rgb(51,192,252)" },
        },
      ],
      layout: {
        width: 1600,
        height: 500,
        title: "",
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
  title =
    "Departamento/Setor x Quantidade de NCs Recebida e Quantidade de NCs Emitida.";
}