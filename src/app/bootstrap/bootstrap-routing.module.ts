import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "../_services/auth-guard.service";

const routes: Routes = [
  {
    path: "ncs",
    // canActivate: [AuthGuardService],
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
        path: "import",
        loadChildren: () =>
          import("../pages/ncs/import-json/import-json.module").then(
            (m) => m.ImportJsonModule
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
