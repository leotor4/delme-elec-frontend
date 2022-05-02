import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePropRoutingModule} from "./create-prop-routing.module";
import {CreatePropComponent} from "./create-prop.component";
import { CreatePropHeaderComponent } from './create-prop-header/create-prop-header.component';
import { CreatePropStepperComponent } from './create-prop-stepper/create-prop-stepper.component';
import {ChipModule} from "primeng/chip";
import {StepsModule} from "primeng/steps";
import { IshikawaDiagramComponent } from './steps/step1/ishikawa-diagram.component';
import {ReasonsWhyComponent} from "./steps/step2/reasons-why.component";
import { ActionPlanComponent } from './steps/step3/action-plan.component';
import { NotificationsComponent } from './steps/step4/notifications.component';
import { ReviewInfomationsComponent } from './steps/step5/review-infomations.component';
import {InputTextareaModule} from "primeng/inputtextarea";




@NgModule({
  declarations: [
      CreatePropComponent,
      CreatePropHeaderComponent,
      CreatePropStepperComponent,
      IshikawaDiagramComponent,
      ReasonsWhyComponent,
      ActionPlanComponent,
      NotificationsComponent,
      ReviewInfomationsComponent
  ],
    imports: [
        CommonModule,
        CreatePropRoutingModule,
        ChipModule,
        StepsModule,
        InputTextareaModule
    ]
})
export class CreatePropModule { }
