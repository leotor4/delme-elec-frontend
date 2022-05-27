import { BarChartRoutingModule } from './bar-chart-routing.module';
import { BarChartComponent } from './bar-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    BarChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    BarChartRoutingModule
  ]
})
export class BarChartModule { }
