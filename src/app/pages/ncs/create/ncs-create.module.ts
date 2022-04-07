import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NcsCreateRoutingModule } from "./ncs-create-routing.module";
import { NcsCreateComponent } from "./ncs-create.component";
import { StepsModule } from "primeng/steps";
import { ButtonModule } from "primeng/button";
import { NcsCreateHeaderComponent } from "./ncs-create-header/ncs-create-header.component";
import { StakeholdersComponent } from "./steps/stakeholders/stakeholders.component";
import { IdentificarNcComponent } from "./steps/passo1/identificar-nc/identificar-nc.component";
import { DescricaoNcComponent } from "./steps/passo1/descricao-nc/descricao-nc.component";
import { IdentificacaoDaNcComponent } from "./steps/passo1/identificacao-da-nc/identificacao-da-nc.component";
import { ParceiroComponent } from "./steps/passo1/parceiro/parceiro.component";
import { FormsModule } from "@angular/forms";
import { Step2Component } from './steps/step2/step2.component';
import { NcsCreateStepperComponent } from './ncs-create-stepper/ncs-create-stepper.component';

@NgModule({
  declarations: [
    NcsCreateComponent,
    NcsCreateHeaderComponent,
    StakeholdersComponent,
    IdentificarNcComponent,
    DescricaoNcComponent,
    IdentificacaoDaNcComponent,
    ParceiroComponent,
    Step2Component,
    NcsCreateStepperComponent,
  ],
  imports: [
    CommonModule,
    NcsCreateRoutingModule,
    StepsModule,
    ButtonModule,
    FormsModule,
  ],
})
export class NcsCreateModule {}
