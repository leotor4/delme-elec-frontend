import { DashboardsRoutingModule } from './dashboards-routing.module';
import { DashboardsComponent } from './dashboards.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [
    DashboardsComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    DashboardsRoutingModule
  ]
})
export class DashboardsModule { 

}


