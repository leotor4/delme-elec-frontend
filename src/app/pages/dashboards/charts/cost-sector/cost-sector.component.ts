import { Component, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-cost-sector",
  templateUrl: "./cost-sector.component.html",
  styleUrls: ["./cost-sector.component.css"],
})
export class CostSectorComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}
  display = true;
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  onSelect(event: any) {}
  setor = "Todos";
  setores: string[] = [];
  setoresAux: string[] = [];
  quantAnos: number[] = [];
  quantCusto: number[] = [];

  popular() {
    this.setores.length = 0;
    this.quantAnos.length = 0;
    this.quantCusto.length = 0;
    this.chartsService.sectors.forEach((element) => {
      if (element == this.setor || this.setor == "Todos") {
        this.setores.push(element);
        this.quantAnos.push(0);
        this.quantCusto.push(0);
      }
    });
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_local_item) {
        let setor = element.tipos_local_item;

        let index = this.setores.indexOf(setor);

        if (index > -1) {
          this.quantAnos[index]++;
        } else {
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

    console.log(this.setores);

    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 200);
  }

  popularSetores() {
    this.setoresAux = Object.assign([], this.chartsService.sectors);
    this.setoresAux.push("Todos");
    this.setor = "Todos";
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
