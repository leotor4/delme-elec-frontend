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
  ngOnInit(): void {
    this.popular();
  }

  single: any[] = [];
  tipos: string[] = [];
  quant: number[] = [];

  popular() {
    this.chartsService.ncs.forEach((element) => {
      if (element.tipos_nc_item) {
        let index = this.tipos.indexOf(element.tipos_nc_item);
        if (index == -1) {
          this.tipos.push(element.tipos_nc_item);
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
