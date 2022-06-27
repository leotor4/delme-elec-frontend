import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../_services/auth-guard.service";
import { CreatePropModule } from "../pages/ncs/create-prop/create-prop.module";

const routes: Routes = [
  {
    path: "ncs",
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../pages/ncs/list/ncs-list.module").then(
            (m) => m.NcsListModule
          ),
      },

      {
        path: "create",
        loadChildren: () =>
          import("../pages/ncs/create/ncs-create.module").then(
            (m) => m.NcsCreateModule
          ),
      },

      {
        path: "create/:id",
        loadChildren: () =>
          import("../pages/ncs/create/ncs-create.module").then(
            (m) => m.NcsCreateModule
          ),
      },

      {
        path: "import",
        loadChildren: () =>
          import("../pages/ncs/import-json/import-json.module").then(
            (m) => m.ImportJsonModule
          ),
      },

      {
        path: "about/:id",
        loadChildren: () =>
          import("../pages/ncs/about/about.module").then(
            (m) => m.NcAboutModule
          ),
      },

      {
        path: "createProp/:id",
        loadChildren: () =>
          import("../pages/ncs/create-prop/create-prop.module").then(
            (m) => m.CreatePropModule
          ),
      },
      {
        path: "sgq/:id",
        loadChildren: () =>
          import("../pages/ncs/sgq-evaluation/sgq.module").then(
            (m) => m.SgqModule
          ),
      },
    ],
  },

  {
    path: "dashboards",
    canActivate: [AuthGuardService],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("../pages/dashboards/dashboards.module").then(
            (m) => m.DashboardsModule
          ),
      },
      {
        path: "bar-chart",
        loadChildren: () =>
          import("../pages/dashboards/bar-chart/bar-chart.module").then(
            (m) => m.BarChartModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BootstrapRoutingModule {}
