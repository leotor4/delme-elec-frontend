import { BarChartComponent } from './../bar-chart/bar-chart.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
		path: '',
		component: BarChartComponent,
	},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BarChartRoutingModule { }
