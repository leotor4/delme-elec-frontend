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
import { NcProductsComponent } from './charts/nc-products/nc-products.component';
import { NcTypesComponent } from './charts/nc-types/nc-types.component';
import { NcEmissorComponent } from './charts/nc-emissor/nc-emissor.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [DashboardsComponent, NcStatusComponent, NcYearComponent, CostSectorComponent, NcProductsComponent, NcTypesComponent, NcEmissorComponent],
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
