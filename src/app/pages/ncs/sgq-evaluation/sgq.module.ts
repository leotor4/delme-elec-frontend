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
import {EditorModule} from "primeng/editor";
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {FormsModule} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {AccordionModule} from "primeng/accordion";
import { AddNcDialogComponent } from './steps/reoccurrence/add-nc-dialog/add-nc-dialog.component';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {MessagesModule} from "primeng/messages";
import {InputTextModule} from "primeng/inputtext";
import { NcInfoComponent } from './steps/reoccurrence/nc-info/nc-info.component';
import {TabViewModule} from "primeng/tabview";
import { NcInforViewNcComponent } from './steps/reoccurrence/nc-info/nc-infor-view-nc/nc-infor-view-nc.component';

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
      AddNcDialogComponent,
      NcInfoComponent,
      NcInforViewNcComponent,
  ],
    imports: [
        CommonModule,
        SgqRoutingModule,
        StepsModule,
        ChipModule,
        EditorModule,
        ToastModule,
        TableModule,
        DialogModule,
        AutoCompleteModule,
        ConfirmDialogModule,
        FormsModule,
        AccordionModule,
        DynamicDialogModule,
        MessagesModule,
        InputTextModule,
        TabViewModule

    ],
    entryComponents: [AddNcDialogComponent, NcInfoComponent],
    providers: [MessageService, ConfirmationService],
})
export class SgqModule { }
