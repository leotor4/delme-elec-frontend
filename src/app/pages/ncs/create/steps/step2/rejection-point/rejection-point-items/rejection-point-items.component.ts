import { JsonpClientBackend } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { Instruction } from "src/app/models/instruction";
import { Procedure } from "src/app/models/procedure";
import { VisualizarDocumentoDialogComponent } from "src/app/pages/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component";

import { InstructionsService } from "src/app/_services/instructions.service";

import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { ItDialogComponent } from "../it-dialog/it-dialog.component";
import {environment} from "../../../../../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-rejection-point-items",
  templateUrl: "./rejection-point-items.component.html",
  styleUrls: ["./rejection-point-items.component.css"],
  providers: [DialogService],
})
export class RejectionPointItemsComponent implements OnInit {
  constructor(
    public nonComplianceService: NonComplianceService,
    public dialogService: DialogService,
    public itService: InstructionsService,
    public tokenService: TokenStorageService,
    private messageService: MessageService,
    public translate: TranslateService
  ) {}

  resultsIt: any[];
  resultsPr: any[];

  onSelectedIt() {
    console.log(this.nonComplianceService.nc.instruction)
    console.log(this.nonComplianceService.autoCompleteItValue)
    
    this.nonComplianceService.nc.instruction =
      this.nonComplianceService.autoCompleteItValue;
  }

  onSelectedPr() {
    this.nonComplianceService.nc.procedure =
      this.nonComplianceService.autoCompletePrValue;
  }

  searchIt(event: any) {
    let filtro = event.query;
    this.resultsIt = [];
    this.nonComplianceService.instructions.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        element.descriptionAux = element.rev + " - " + element.description
        this.resultsIt.push(element);
      }
    });
  }

  searchPr(event: any) {
    let filtro = event.query;
    this.resultsPr = [];
    this.nonComplianceService.procedures.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        this.resultsPr.push(element);
      }
    });
  }

  onChange() {
    if (!this.nonComplianceService.autoCompleteItValue) {
      this.nonComplianceService.nc.instruction = undefined;
    }

    if (!this.nonComplianceService.autoCompletePrValue) {
      this.nonComplianceService.nc.procedure = undefined;
    }
  }

  verificarExistencia(element: any, filtro: string): boolean {
    return element.code?.toUpperCase().includes(filtro?.toUpperCase()) ||
        element.rev?.toUpperCase().includes(filtro?.toUpperCase()) ||
        element.description?.toUpperCase().includes(filtro?.toUpperCase());

  }

  returnOpScreen() {
    return this.nonComplianceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type1") ||
        this.nonComplianceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type2") ||
        this.nonComplianceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type3");
  }

  returnNfScreen() {
    return this.nonComplianceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type4");
  }

  returnPrScreen() {
    return this.nonComplianceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type8");
  }

/*  openDialog() {
    const ref = this.dialogService.open(ItDialogComponent, {
      header: "Criar Instrução",
      width: "425px",
    });
  }*/

  /*visualizarIt() {
    let instruction = this.nonComplianceService.nc.instruction;
    if (instruction) {
      this.itService.downloadFile(instruction.id).subscribe((data) => {
        const ref = this.dialogService.open(
          VisualizarDocumentoDialogComponent,
          {
            data: {
              base64: data.data,
              type:"pdf",
            },
            header: "Visualizar Instrução",
            width: "1000px",
          }
        );
      });
    } else {
      this.messageService.add({
        severity: "info",
        summary: "Selecione uma instrução para poder visualizar.",
        life: 3000,
      });
    }
  }*/
  getUrl(){
    return environment.apiURL + 'ncs/import'
  }
  isRequired() {
    if(this.nonComplianceService.formIdentificacaoNC.value.tipos_nc_item ==
        this.translate.instant("newNC.step1.ncType.type6")){
      return "*"
    } else return ""
  }

  ngOnInit(): void {}
}
