import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-nc-receptor-emissor",
  templateUrl: "./nc-receptor-emissor.component.html",
  styleUrls: ["./nc-receptor-emissor.component.css"],
})
export class NcReceptorEmissorComponent implements OnInit {
  @Input() size: number[] = [];
  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.tipos = Object.assign([], this.chartsService.sectors);
    this.popular();
  }

  single: any[] = [];
  multi: any[] = [];
  tipos: string[] = [];
  graph: any;
  tiposNc: string[] = [
    this.translate.instant("global.all"),
    this.translate.instant("newNC.step1.ncType.type1"),
    this.translate.instant("newNC.step1.ncType.type2"),
    this.translate.instant("newNC.step1.ncType.type3"),
    this.translate.instant("newNC.step1.ncType.type4"),
    this.translate.instant("newNC.step1.ncType.type5"),
    this.translate.instant("newNC.step1.ncType.type6"),
  ];
  tiposNcAtual = this.translate.instant("global.all");
  quant: number[] = [];
  quantEmissor: number[] = [];

  ordenar() {
    this.multi.sort(function (a, b) {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  popular() {
    this.quant = [];
    this.quantEmissor = [];
    this.multi = [];
    this.tipos = Object.assign([], this.chartsService.sectors);

    for (var i = 0; i < this.tipos.length; i++) {
      this.quant.push(0);
      this.quantEmissor.push(0);
    }
    this.chartsService.ncs.forEach((element) => {
      if (
        
        (element.tipos_nc_item == this.tiposNcAtual ||
          this.tiposNcAtual == this.translate.instant("global.all"))
      ) {
       
        let setorReceptor = element.sector;
        let setorEmissor = element.emissor?.sector;
        
        if(setorReceptor){
          
          let index = this.tipos.indexOf(setorReceptor.name);
        if (index == -1) {
          this.tipos.push(setorReceptor.name);
          this.quant.push(1);
        } else {
          this.quant[index]++;
        }
        }

        if(setorEmissor){
          let index = this.tipos.indexOf(setorEmissor.name);
        if (index == -1) {
          this.tipos.push(setorEmissor.name);
          this.quantEmissor.push(1);
        } else {
          this.quantEmissor[index]++;
        }
        }
      }
    });

    for (var i = 0; i < 19; i++) {
      this.multi.push({
        name: this.tipos[i],
        series: [
          {
            name: this.translate.instant("charts.ncsReceived"),
            value: this.quant[i],
          },
          {
            name: this.translate.instant("charts.ncsSent"),
            value: this.quant[i],
          },
        ],
      });
    }

   
    let cont = 0
    while(true){
      if(this.quant[cont]==0 && this.quantEmissor[cont]==0){
        this.tipos.splice(cont,1)
        this.quant.splice(cont,1)
        this.quantEmissor.splice(cont,1)
      }else{
        cont++
      }
      if(cont == this.tipos.length)
      break;
    }
    this.ordenar();
  
    this.graph = {
      data: [
        {
          x: this.tipos,
          y: this.quant,
          text: this.quant.map(String),
          textposition: "auto",
          
          hoverinfo: "none",
          type: "bar",
          name: this.translate.instant("charts.ncsReceived"),
          marker: { color: "rgb(29,104,251)" },
        },
        {
          x: this.tipos,
          y: this.quantEmissor,
          text: this.quantEmissor.map(String),
          textposition: "auto",

          name: this.translate.instant("charts.ncsSent"),
          type: "bar",
          marker: { color: "rgb(51,192,252)" },
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],

        xaxis: { title: this.translate.instant("charts.sectors") },
        yaxis: { title: this.translate.instant("charts.title11") },
        autosize: true,
        title: "",
      },
      config: { responsive: true },
    };
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
  title = this.translate.instant("charts.title7");
}
