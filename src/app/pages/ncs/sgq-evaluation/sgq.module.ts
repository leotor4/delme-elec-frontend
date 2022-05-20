import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SgqRoutingModule} from "./sgq-routing.module";
import {SgqComponent} from "./sgq.component";
import {StepsModule} from "primeng/steps";
import { SgqStepperComponent } from './sgq-stepper/sgq-stepper.component';
import { SgqHeaderComponent } from './sgq-header/sgq-header.component';
import {ChipModule} from "primeng/chip";
import { ReoccurrenceComponent } from './steps/reoccurrence/reoccurrence.component';
import { EvidenceComponent } from './steps/evidence/evidence.component';
import { RisksComponent } from './steps/risks/risks.component';
import { ChangesComponent } from './steps/changes/changes.component';
import { NotificationsComponent } from './steps/notifications/notifications.component';
import { ReviewInfoSGQComponent } from './steps/review-info-sgq/review-info-sgq.component';

@NgModule({
  declarations: [
      SgqComponent,
      SgqStepperComponent,
      SgqHeaderComponent,
      ReoccurrenceComponent,
      EvidenceComponent,
      RisksComponent,
      ChangesComponent,
      NotificationsComponent,
      ReviewInfoSGQComponent,
  ],
    imports: [
        CommonModule,
        SgqRoutingModule,
        StepsModule,
        ChipModule,

    ],
    entryComponents: [],
    providers: [],
})
export class SgqModule { }
