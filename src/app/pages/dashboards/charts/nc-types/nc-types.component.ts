import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-nc-types",
  templateUrl: "./nc-types.component.html",
  styleUrls: ["./nc-types.component.css"],
})
export class NcTypesComponent implements OnInit {
  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService
  ) {}
  @Input() size: number[] = [];
  setor: any;
  setores: string[] = [];
  graph: any;
  ngOnInit(): void {
    this.popularSetores();
    this.popular();
  }

  single: any[] = [];
 

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
      if (
        nc.tipos_local_item == this.setor ||
        this.setor == this.translate.instant("global.all")
      ) {
        if (nc.tipos_nc_item) {
          this.single.forEach((element) => {
            if (element["name"] == nc.tipos_nc_item) {
              element["value"] += 1;
            }
          });
        }
      }
    });
     let tipos: string[] = [];
     let quant: number[] = [];
    this.single.forEach((element) => {
      tipos.push(element.name);
      quant.push(element.value);
    });
    this.graph = {
      data: [
        {
          x: tipos,
          y: quant,
          type: "bar",
          name: this.translate.instant("charts.ncsReceived"),
          marker: { color: "rgb(29,104,251)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: { title: "Tipos de NC" },
        yaxis: { title: "Quantidade de NCs" },
        autosize: true,
        title: "",
      },
      config: { responsive: true },
    };
  }

  popularSetores() {
    this.setores = Object.assign([], this.chartsService.sectors);

    this.setores.unshift(this.translate.instant("global.all"));

    this.setor = this.translate.instant("global.all");
  }

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = "Tipos de NC";
  yAxisLabel = "Quantidade de NC";
  gridColor = "ocean";
}
