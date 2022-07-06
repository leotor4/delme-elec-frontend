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
import { ActionPlanDialogComponent } from './steps/step3/action-plan-dialog/action-plan-dialog.component';
import {NcsCreateModule} from "../create/ncs-create.module";
import {NotificationComponent} from "./steps/step4/notification.component";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {AccordionModule} from "primeng/accordion";
import {DadosNCComponent} from "../../dialogs/dados-nc/dados-nc.component";
import {NcAboutModule} from "../about/about.module";
import {CarouselModule} from "primeng/carousel";
import {DividerModule} from "primeng/divider";
import {TranslateModule} from "@ngx-translate/core";





@NgModule({
  declarations: [
      CreatePropComponent,
      CreatePropHeaderComponent,
      CreatePropStepperComponent,
      IshikawaDiagramComponent,
      ReasonsWhyComponent,
      ActionPlanComponent,
      NotificationComponent,
      ReviewInfomationsComponent,
      IshikawaDialogComponent,
      ActionPlanDialogComponent,
      DadosNCComponent
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
        NcsCreateModule,
        ToastModule,
        DialogModule,
        AccordionModule,
        NcAboutModule,
        CarouselModule,
        DividerModule,
        TranslateModule,
    ],
    entryComponents: [IshikawaDialogComponent, ActionPlanDialogComponent, DadosNCComponent],
    providers: [ConfirmationService],
})
export class CreatePropModule { }
