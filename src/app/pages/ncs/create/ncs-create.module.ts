import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NcsCreateRoutingModule } from "./ncs-create-routing.module";
import { NcsCreateComponent } from "./ncs-create.component";
import { StepsModule } from "primeng/steps";
import { ButtonModule } from "primeng/button";
import { NcsCreateHeaderComponent } from "./ncs-create-header/ncs-create-header.component";
import { ContactsComponent } from "./steps/step3/contacts.component";
import { IdentificarNcComponent } from "./steps/step1/identificar-nc/identificar-nc.component";
import { DescricaoNcComponent } from "./steps/step1/descricao-nc/descricao-nc.component";
import { IdentificacaoDaNcComponent } from "./steps/step1/identificacao-da-nc/identificacao-da-nc.component";
import { ParceiroComponent } from "./steps/step1/parceiro/parceiro.component";
import { FormsModule } from "@angular/forms";
import { Step2Component } from "./steps/step2/step2.component";
import { NcsCreateStepperComponent } from "./ncs-create-stepper/ncs-create-stepper.component";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { ProductComponent } from "./steps/step2/product/product.component";
import { CheckpointComponent } from "./steps/step2/checkpoint/checkpoint.component";
import { RejectionPointComponent } from "./steps/step2/rejection-point/rejection-point.component";
import { EditorModule } from "primeng/editor";
import { FileUploadModule } from "primeng/fileupload";
import { RadioButtonModule } from "primeng/radiobutton";
import { WaitingProductComponent } from "./waiting-product/waiting-product.component";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TableModule } from "primeng/table";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { CardModule } from "primeng/card";
import { ContactDialogComponent } from "./steps/step3/contact-dialog/contact-dialog.component";
import { DynamicDialogModule } from "primeng/dynamicdialog";

@NgModule({
  declarations: [
    NcsCreateComponent,
    NcsCreateHeaderComponent,
    ContactsComponent,
    IdentificarNcComponent,
    DescricaoNcComponent,
    IdentificacaoDaNcComponent,
    ParceiroComponent,
    Step2Component,
    NcsCreateStepperComponent,
    ProductComponent,
    CheckpointComponent,
    RejectionPointComponent,
    WaitingProductComponent,
    ContactDialogComponent,
  ],
  imports: [
    CommonModule,
    NcsCreateRoutingModule,
    StepsModule,
    ButtonModule,
    FormsModule,
    DividerModule,
    InputTextModule,
    DropdownModule,
    EditorModule,
    FileUploadModule,
    RadioButtonModule,
    AutoCompleteModule,
    TableModule,
    ConfirmDialogModule,
    DialogModule,
    DynamicDialogModule,
    ToastModule,
    CardModule,
  ],
  entryComponents: [ContactDialogComponent],
  providers: [MessageService, ConfirmationService],
})
export class NcsCreateModule {}
