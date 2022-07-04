import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-types",
  templateUrl: "./nc-types.component.html",
  styleUrls: ["./nc-types.component.css"],
})
export class NcTypesComponent implements OnInit {
  constructor(public chartsService: ChartsService) {}
  @Input() size: number[] = [];
  setor: any;
  setores: string[] = [];
  ngOnInit(): void {
    this.popularSetores()
    this.popular();
  }

  single: any[] = [];
  tipos: string[] = [];
  quant: number[] = [];

  popular() {
    this.single = [
      {
        name: "Auditoria Interna",
        value: 0,
      },
      {
        name: "Auditoria Externa",
        value: 0,
      },
      {
        name: "NC de Fornecedor",
        value: 0,
      },
      {
        name: "NC de Processo",
        value: 0,
      },
      {
        name: "NC de Produto",
        value: 0,
      },
    ];

    this.chartsService.ncs.forEach((nc) => {
      if (nc.tipos_local_item == this.setor || this.setor == "Todos") {
        if (nc.tipos_nc_item) {
          this.single.forEach((element) => {
            if (element["name"] == nc.tipos_nc_item) {
              element["value"] += 1;
            }
          });
        }
      }
    });
  }

  popularSetores() {
   this.setores = Object.assign([],this.chartsService.sectors)

    this.setores.push("Todos");

    this.setor = "Todos";
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
}
