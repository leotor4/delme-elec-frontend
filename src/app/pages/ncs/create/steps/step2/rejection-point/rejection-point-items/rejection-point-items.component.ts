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
    private messageService: MessageService
  ) {}

  resultsIt: any[];
  resultsPr: any[];

  onSelectedIt() {
    console.log(this.nonComplianceService.nc.instruction)
    console.log(this.nonComplianceService.autoCompleteItValue)
    
    this.nonComplianceService.nc.instruction =
      this.nonComplianceService.autoCompleteItValue;
    console.log(this.nonComplianceService.nc.instruction)
  }

  onSelectedPr() {
    this.nonComplianceService.nc.procedure =
      this.nonComplianceService.autoCompletePrValue;
  }

  searchIt(event: any) {
    var filtro = event.query;
    this.resultsIt = [];
    this.nonComplianceService.instructions.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        element.descriptionAux = element.rev + " - " + element.description
        this.resultsIt.push(element);
      }
    });
  }

  searchPr(event: any) {
    var filtro = event.query;
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
    if (
      this.nonComplianceService.nc.tipo_controle == "OP-PROD(ORDEM DE PRODUÇÃO PRODUTO ACABADO)" ||
      this.nonComplianceService.nc.tipo_controle == "OP-SA(ORDEM DE PRODUÇÃO PRODUTO SEMIACABADO)" ||
      this.nonComplianceService.nc.tipo_controle == "OP-I(ORDEM DE PRODUÇÃO CORTE)"
    ) {
      return true;
    } else {
      return false;
    }
  }

  returnNfScreen() {
    if (this.nonComplianceService.nc.tipo_controle == "NF-e(NOTA FISCAL ELETRÔNICA)") {
      return true;
    } else {
      return false;
    }
  }

  returnPrScreen() {
    if (this.nonComplianceService.nc.tipo_controle == "PR(PROCEDIMENTO)") {
      return true;
    } else {
      return false;
    }
  }

  openDialog() {
    const ref = this.dialogService.open(ItDialogComponent, {
      header: "Criar Instrução",
      width: "425px",
    });
  }

  visualizarIt() {
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
  }
  getUrl(){
    return environment.apiURL + 'ncs/import"'
  }

  ngOnInit(): void {}
}
