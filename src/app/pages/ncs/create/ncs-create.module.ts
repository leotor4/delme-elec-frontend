import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NcsCreateRoutingModule } from "./ncs-create-routing.module";
import { NcsCreateComponent } from "./ncs-create.component";
import { StepsModule } from "primeng/steps";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [NcsCreateComponent],
  imports: [CommonModule, NcsCreateRoutingModule, StepsModule, ButtonModule],
})
export class NcsCreateModule {}
