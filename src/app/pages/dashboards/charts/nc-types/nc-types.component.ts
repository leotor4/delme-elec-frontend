import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-nc-types",
  templateUrl: "./nc-types.component.html",
  styleUrls: ["./nc-types.component.css"],
})
export class NcTypesComponent implements OnInit {
  constructor(public chartsService: ChartsService, public translate: TranslateService) {}
  @Input() size: number[] = [];
  setor: any;
  setores: string[] = [];
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  single: any[] = [];
  tipos: string[] = [];
  quant: number[] = [];

  popular() {
    this.single = [
      {
        name: this.translate.instant("newNC.step1.ncType.type1"),
        value: 0,
      },
      {
        name: this.translate.instant("newNC.step1.ncType.type2"),
        value: 0,
      },
      {
        name: this.translate.instant("newNC.step1.ncType.type3"),
        value: 0,
      },
      {
        name: this.translate.instant("newNC.step1.ncType.type4"),
        value: 0,
      },
      {
        name: this.translate.instant("newNC.step1.ncType.type5"),
        value: 0,
      },
      {
        name: this.translate.instant("newNC.step1.ncType.type6"),
        value: 0,
      },
    ];

    this.chartsService.ncs.forEach((nc) => {
      if (nc.tipos_local_item == this.setor || this.setor == this.translate.instant("global.all")) {
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
    this.setores = Object.assign([], this.chartsService.sectors);

    this.setores.push(this.translate.instant("global.all"));

    this.setor = this.translate.instant("global.all");
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
}
