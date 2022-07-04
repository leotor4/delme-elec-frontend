import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-emissor",
  templateUrl: "./nc-emissor.component.html",
  styleUrls: ["./nc-emissor.component.css"],
})
export class NcEmissorComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(public chartsService: ChartsService) {}
  ngOnInit(): void {
    this.tipos = Object.assign([], this.chartsService.sectors);
    this.popular();
  }

  single: any[] = [];
  tipos: string[] = [];
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

  ordenar() {
    this.single.sort(function (a, b) {
      return a.value - b.value;
    });
  }

  popular() {
    for (var i = 0; i < this.tipos.length; i++) {
      this.quant.push(0);
    }
    this.chartsService.ncs.forEach((element) => {
      if (
        element.emissor &&
        (element.tipos_nc_item == this.tiposNcAtual ||
          this.tiposNcAtual == "Todos")
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
    });

    for (var i = 0; i < this.tipos.length; i++) {
      this.single.push({
        name: this.tipos[i],
        value: this.quant[i],
      });
    }

    this.ordenar();
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
  title = "Departamento Emissor x Quantidade de Ncs";
}
