import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-nc-status",
  templateUrl: "./nc-status.component.html",
  styleUrls: ["./nc-status.component.css"],
})
export class NcStatusComponent implements OnInit {
  constructor(public chartsService: ChartsService, public translate: TranslateService) {}
  @Input() size: number[] = [];
  setor: any;
  setores: string[] = [];

  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  single: any[] = [
    {
      name: this.translate.instant("global.status1"),
      value: 0,
    },
    {
      name: this.translate.instant("global.status2"),
      value: 0,
    },
    {
      name: this.translate.instant("global.status6"),
      value: 0,
    },
    {
      name: this.translate.instant("global.status3"),
      value: 0,
    },
    {
      name: this.translate.instant("global.status7"),
      value: 0,
    },
  ];

  popularSetores() {
    this.setores = Object.assign([], this.chartsService.sectors);

    this.setores.unshift("Todos");

    this.setor = "Todos";
  }

  popular() {
    this.single = [
      {
        name: this.translate.instant("global.status1"),
        value: 0,
      },
      {
        name: this.translate.instant("global.status2"),
        value: 0,
      },
      {
        name: this.translate.instant("global.status6"),
        value: 0,
      },
      {
        name: this.translate.instant("global.status3"),
        value: 0,
      },
      {
        name: this.translate.instant("global.status7"),
        value: 0,
      },
    ];
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_local_item == this.setor || this.setor == this.translate.instant("global.all")) {
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
  xAxisLabel = "Status da Nc";
  yAxisLabel = "Quantidade de NCs";
  gridColor = "ocean";

  onSelect(event: any) {}
}
