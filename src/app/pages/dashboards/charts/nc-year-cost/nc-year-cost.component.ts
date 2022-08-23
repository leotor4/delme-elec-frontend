import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Cost } from 'src/app/models/Cost';
import { ChartsService } from 'src/app/_services/charts.service';

@Component({
  selector: 'app-nc-year-cost',
  templateUrl: './nc-year-cost.component.html',
  styleUrls: ['./nc-year-cost.component.css']
})
export class NcYearCostComponent implements OnInit {
@Input() size: number[] = [];
anos: number[] = [];
percent: number[] = [];
quantCusto: number[] = [];
graph: any;

  constructor(
    public chartsService: ChartsService,
    public translate: TranslateService) {}

  ngOnInit(): void {
    this.popular()
   

  }

  popular(){
    let ncs = this.chartsService.ncs
    ncs.forEach(element=>{
      if(element.costs && element.data_abertura){
        let ano = new Date(element.data_abertura).getFullYear()
        let total = this.calcularValorTotal(element.costs)
        let index = this.anos.indexOf(ano)
        if(index == -1){
          this.anos.push(ano)
          this.quantCusto.push(total)
        }else{
          this.quantCusto[index] += total
        }
      }
    })

  

    for(var i =0;i<this.anos.length;i++){
      let custoAnterior = this.quantCusto[i-1]
      let custoAtual = this.quantCusto[i]
      let porcentagem = 0
      if(custoAnterior){
        porcentagem = (custoAtual-custoAnterior)*100/custoAnterior
      }
      this.percent.push(porcentagem)
    }

    this.graph = {
      data: [
        {
          x: this.anos,
          y: this.quantCusto,
          text: this.quantCusto.map(String),
          textposition: "auto",
          name: this.translate.instant("charts.cost"),
          type: "bar",
          marker: { color: "rgb(29,104,251)" },
        }, {
          x: this.anos,
          y: this.percent,
          text: this.percent.map((element)=>{return element + "%"}),
          mode: "lines+markers+text",
          textposition: "top",
          yaxis: "y2",
          name: this.translate.instant("charts.costVariacao"),
          type: "scatter",
          marker: { color: "rgb(252,134,43)" },
        },
        
      ],
      layout: {
        width: this.size[0],
        height: this.size[1],
        xaxis: {
          autotick: false,
          title: this.translate.instant("charts.year"),
        },
         yaxis2: {
          overlaying: "y",
          side: "right",
          showgrid: false,
          zeroline: false,
          title: this.translate.instant("charts.cost%"),
        },
        yaxis: { title: this.translate.instant("charts.cost")},
      },
    };
  }

  calcularValorTotal(costs:Cost[]):number{
    let total = 0
    costs.forEach(element=>{
      total += parseFloat(element.value)
    })
    return Math.round(total)
  }

}
