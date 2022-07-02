import { DashboardsRoutingModule } from "./dashboards-routing.module";
import { DashboardsComponent } from "./dashboards.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NcStatusComponent } from "./charts/nc-status/nc-status.component";
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from "@angular/forms";
import { NcYearComponent } from "./charts/nc-year/nc-year.component";
import * as PlotlyJS from "plotly.js-dist-min";
import { PlotlyModule } from "angular-plotly.js";
import { CostSectorComponent } from './charts/cost-sector/cost-sector.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [DashboardsComponent, NcStatusComponent, NcYearComponent, CostSectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxChartsModule,
    PlotlyModule,
    DropdownModule,
    DashboardsRoutingModule,
  ],
})
export class DashboardsModule {}
