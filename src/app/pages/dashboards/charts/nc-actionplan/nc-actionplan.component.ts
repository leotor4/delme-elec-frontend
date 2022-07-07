import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-actionplan",
  templateUrl: "./nc-actionplan.component.html",
  styleUrls: ["./nc-actionplan.component.css"],
})
export class NcActionplanComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(public chartsService: ChartsService) {}
  ngOnInit(): void {
    this.tipos = Object.assign([], this.chartsService.sectors);
    this.popular();
  }

  single: any[] = [];
  multi: any[] = [];
  tipos: string[] = [];
  graph: any;
  tiposNc: string[] = [
    "Todos",
    "Auditoria Interna",
    "Auditoria Externa",
    "NC de Fornecedor",
    "NC de Processo",
    "NC de Cliente",
    "NC de Produto",
  ];
  tiposNcAtual = "Todos";

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

    for (var i = 0; i < this.tipos.length; i++) {
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
          this.tiposNcAtual == "Todos")
      ) {
        let planos = element.proposalSolution?.actionPlans;
        let index = this.tipos.indexOf(element.tipos_local_item);
        this.ncs[index]++;
        planos?.forEach((element) => {
          switch (element.status) {
            case "Atrasada":
              this.atrasado[index]++;
              break;
            case "Em execução":
              this.execucao[index]++;
              break;
            case "Concluida":
              this.concluido[index]++;
              break;
            case "Cancelada":
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
          name: "Em execução",
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.tipos,
          y: this.concluido,
          name: "Concluido",
          type: "bar",
          marker: { color: "rgb(51,192,252)" },
        },
        {
          x: this.tipos,
          y: this.atrasado,
          name: "Atrasado",
          type: "bar",
          marker: { color: "rgb(74,255,254)" },
        },

        {
          x: this.tipos,
          y: this.cancelado,
          name: "Cancelado",
          type: "bar",
          marker: { color: "rgb(175,255,255)" },
        },
        {
          x: this.tipos,
          y: this.ncs,
          name: "Número de ncs",
          type: "scatter",
          marker: { color: "rgb(252,134,43)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        title: "",
        xaxis: {
          autotick: false,
          title: "Setores",
        },

        yaxis: { title: "Quantidade de Planos de Ação" },
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
