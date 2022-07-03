import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";

@Component({
  selector: "app-nc-emissor",
  templateUrl: "./nc-emissor.component.html",
  styleUrls: ["./nc-emissor.component.css"],
})
export class NcEmissorComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(public chartsService: ChartsService) {}
  ngOnInit(): void {
    this.popular();
    
  }

  single: any[] = [];

  ordenar() {
    this.single.sort(function (a, b) {
      return a.value - b.value;
    });
  }

  tipos: string[] = [];
  quant: number[] = [];

  popular() {
    this.chartsService.ncs.forEach((element) => {
      if (element.emissor) {
        let emissor = element.emissor;
        let index = this.tipos.indexOf(emissor.username!);
        if (index == -1) {
          this.tipos.push(emissor.username!);
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

    this.ordenar();
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
