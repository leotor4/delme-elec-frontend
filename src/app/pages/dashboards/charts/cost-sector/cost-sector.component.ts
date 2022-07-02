import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/_services/charts.service';

@Component({
  selector: "app-cost-sector",
  templateUrl: "./cost-sector.component.html",
  styleUrls: ["./cost-sector.component.css"],
})
export class CostSectorComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}

  ngOnInit(): void {
    this.popular();
  }

  onSelect(event: any) {}

  setores: string[] = [];
  quantAnos: number[] = [];
  quantCusto: number[] = [];

  popular() {
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_local_item) {
        let setor = element.tipos_local_item;

        let index = this.setores.indexOf(setor);
        if (index == -1) {
          this.setores.push(setor);
          this.quantAnos.push(1);
          this.quantCusto.push(0);
        } else {
          this.quantAnos[index]++;
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
  }

  graph = {
    data: [
      {
        x: this.setores,
        y: this.quantCusto,
        type: "scatter",
        name: "Custo",
        marker: { color: "rgb(252,134,43)" },
      },
      {
        x: this.setores,
        y: this.quantAnos,
        name: "Quantidade",
        type: "bar",
        marker: { color: "rgb(41,113,182)" },
      },
    ],
    layout: {
      width: 900,
      height: 500,
      title: "Número de Ncs x Custo Total",
    },
  };
}
