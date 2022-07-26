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
import { NcReceptorComponent } from './charts/nc-receptor/nc-receptor.component';
import { NcReceptorEmissorComponent } from './charts/nc-receptor-emissor/nc-receptor-emissor.component';
import { NcCountComponent } from './charts/nc-count/nc-count.component';
import { NcActionplanComponent } from './charts/nc-actionplan/nc-actionplan.component';
import {TranslateModule} from "@ngx-translate/core";
import { NcSectorProposalComponent } from './charts/nc-sector-proposal/nc-sector-proposal.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [DashboardsComponent, NcStatusComponent, NcYearComponent, CostSectorComponent, NcProductsComponent, NcTypesComponent, NcEmissorComponent, NcReceptorComponent, NcReceptorEmissorComponent, NcCountComponent, NcActionplanComponent, NcSectorProposalComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgxChartsModule,
        PlotlyModule,
        DropdownModule,
        DashboardsRoutingModule,
        TranslateModule,
    ],
})
export class DashboardsModule {}
