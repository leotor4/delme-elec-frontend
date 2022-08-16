import { Component, Input, OnInit } from "@angular/core";
import { ChartsService } from "src/app/_services/charts.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-nc-status",
  templateUrl: "./nc-status.component.html",
  styleUrls: ["./nc-status.component.css"],
})
export class NcStatusComponent implements OnInit {
  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService
  ) {}
  @Input() size: number[] = [];
  setor: any;
  setores: string[] = [];
  graph: any;
  colorScheme = {
    domain: [
     
    ],
  };

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
        name: this.translate.instant("global.canceled"),
        value: 0,
      },
      {
        name: this.translate.instant("global.late"),
        value: 0,
      },
      {
        name: this.translate.instant("global.status2"),
        value: 0,
      },
      {
        name: this.translate.instant("global.status7"),
        value: 0,
      },
    ];
    this.chartsService.ncs.forEach((element) => {
      if (
        element.tipos_local_item == this.setor ||
        this.setor == this.translate.instant("global.all")
      ) {
      
        switch (element.status) {
         
          case "canceled":
            this.single[0].value++;
            break;
          case "late":
            this.single[1].value++;
            break;
          case "running":
            this.single[2].value++;
            break;
          case "closed":
            this.single[3].value++;
            break;
        }
      }
    });
    let tipos:string[] = []
    let quant:number[] = []
    let total = 0
    this.single.forEach(element=>{
      tipos.push(element.name)
      quant.push(element.value);
    })
    let colors:any = [
       "rgb(255,255,0)",
       "rgb(128, 128, 128)",
      "rgb(238, 75, 43)",
        "rgb(124, 252, 0)",
    ]
    quant.forEach(element=>{
      total += element
    })
    this.graph = {
      data: [
        {
          x: tipos,
          y: quant,
          type: "bar",
          name: this.translate.instant("charts.ncsReceived"),
          text: quant.map((quant)=>{return quant +  " (" + (quant/total*100) + "%)"}),
          textposition: "auto",
           marker: {
      color: colors
  }
        },
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: { title: this.translate.instant("charts.title9") },
        yaxis: { title: this.translate.instant("charts.ncAmount") },
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
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = this.translate.instant("charts.title9");
  yAxisLabel = this.translate.instant("charts.ncAmount");
  gridColor = "ocean";

  onSelect(event: any) {}
}
