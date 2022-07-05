import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-status",
  templateUrl: "./nc-status.component.html",
  styleUrls: ["./nc-status.component.css"],
})
export class NcStatusComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}
  @Input() size: number[] = [];
  setor: any;
  setores: string[] = [];

  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  single: any[] = [
    {
      name: "Aberto",
      value: 0,
    },
    {
      name: "Em execução",
      value: 0,
    },
    {
      name: "Cancelada",
      value: 0,
    },
    {
      name: "Atrasada",
      value: 0,
    },
    {
      name: "Encerrada",
      value: 0,
    },
  ];

  popularSetores() {
    this.setores = Object.assign([], this.chartsService.sectors);

    this.setores.push("Todos");

    this.setor = "Todos";
  }

  popular() {
    this.single = [
      {
        name: "Aberto",
        value: 0,
      },
      {
        name: "Em execução",
        value: 0,
      },
      {
        name: "Cancelada",
        value: 0,
      },
      {
        name: "Atrasada",
        value: 0,
      },
      {
        name: "Encerrada",
        value: 0,
      },
    ];
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_local_item == this.setor || this.setor == "Todos") {
        console.log("entrou");
        switch (element.status) {
          case "open":
            this.single[0].value++;
            break;
          case "running":
            this.single[1].value++;
            break;
          case "canceled":
            this.single[2].value++;
            break;
          case "late":
            this.single[3].value++;
            break;
          case "closed":
            this.single[4].value++;
            break;
        }
      }
    });
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
  gridColor = "ocean";

  onSelect(event: any) {}
}
