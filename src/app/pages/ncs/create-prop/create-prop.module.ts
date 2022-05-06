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
import { IshikawaDialogComponent } from './steps/step1/ishikawa-dialog/ishikawa-dialog.component';
import {DynamicDialogModule} from "primeng/dynamicdialog";
import {CheckboxModule} from "primeng/checkbox";
import {EditorModule} from "primeng/editor";
import { FormsModule } from '@angular/forms';
import {AutoCompleteModule} from "primeng/autocomplete";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {TableModule} from "primeng/table";
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from "primeng/api";





@NgModule({
  declarations: [
      CreatePropComponent,
      CreatePropHeaderComponent,
      CreatePropStepperComponent,
      IshikawaDiagramComponent,
      ReasonsWhyComponent,
      ActionPlanComponent,
      NotificationsComponent,
      ReviewInfomationsComponent,
      IshikawaDialogComponent
  ],
    imports: [
        CommonModule,
        CreatePropRoutingModule,
        ChipModule,
        StepsModule,
        InputTextareaModule,
        DynamicDialogModule,
        CheckboxModule,
        EditorModule,
        FormsModule,
        AutoCompleteModule,
        RadioButtonModule,
        InputTextModule,
        CalendarModule,
        DropdownModule,
        TableModule,
        ConfirmDialogModule,
    ],
    entryComponents: [IshikawaDialogComponent],
    providers: [MessageService, ConfirmationService],
})
export class CreatePropModule { }
