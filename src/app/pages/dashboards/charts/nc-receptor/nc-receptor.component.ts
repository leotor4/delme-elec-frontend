import { Component, Input, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/_services/charts.service';

@Component({
  selector: "app-nc-receptor",
  templateUrl: "./nc-receptor.component.html",
  styleUrls: ["./nc-receptor.component.css"],
})
export class NcReceptorComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(public chartsService: ChartsService) {}
  ngOnInit(): void {
    this.tipos = Object.assign([], this.chartsService.sectors);
    this.popular();
  }

  single: any[] = [];
  tipos: string[] = [];
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
      if (
        element.tipos_local_item &&
        (element.tipos_nc_item == this.tiposNcAtual ||
          this.tiposNcAtual == "Todos")
      ) {
        let setor = element.tipos_local_item;

        let index = this.tipos.indexOf(setor);
        if (index == -1) {
          this.tipos.push(setor);
          this.quant.push(1);
        } else {
          this.quant[index]++;
        }
      }
    });

    for (var i = 0; i < this.quant.length; i++) {
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
  xAxisLabel = "Setores";
  yAxisLabel = "Quantidade de NC";
  title = "Departamento Receptor x Quantidade de Ncs";
}
