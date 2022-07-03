import { Component, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-products",
  templateUrl: "./nc-products.component.html",
  styleUrls: ["./nc-products.component.css"],
})
export class NcProductsComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}
  display = true;
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  onSelect(event: any) {}
  setor = "Todos";
  setores: string[] = [];
  produtos: string[] = [];
  quantProdutos: number[] = [];
  setoresAux: string[] = [];
  quantAnos: number[] = [];
  quantCusto: number[] = [];



  popular() {
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_local_item) {
        if (element.tipos_local_item == this.setor || this.setor == "Todos") {
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
      }
    });

    this.display = false;
    setTimeout(() => {
      this.display = true;
    }, 200);
  }

  popularSetores() {
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_local_item) {
        if (this.setoresAux.indexOf(element.tipos_local_item) == -1) {
          this.setoresAux.push(element.tipos_local_item);
        }
      }
    });

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
