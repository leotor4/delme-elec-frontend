import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { Attachment } from "src/app/models/attachment";
import { Procedure } from "src/app/models/procedure";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { PrDialogComponent } from "../pr-dialog/pr-dialog.component";

@Component({
  selector: "app-checkpoint-items",
  templateUrl: "./checkpoint-items.component.html",
  styleUrls: ["./checkpoint-items.component.css"],
  providers: [DialogService],
})
export class CheckpointItemsComponent implements OnInit {
  constructor(
    public nonComplicanceService: NonComplianceService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {}

  results: any;

  search(event: any) {
    var filtro = event.query;
    this.results = [];
    this.nonComplicanceService.procedures.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        this.results.push(element);
      }
    });

   
  }

  verificarExistencia(element: any, filtro: string): boolean {
    if (
      element.code.toUpperCase().includes(filtro.toUpperCase()) ||
      element.rev.toUpperCase().includes(filtro.toUpperCase()) ||
      element.description.toUpperCase().includes(filtro.toUpperCase())
    ) {
      return true;
    }
    return false;
  }

  returnOpScreen() {
    if (
      this.nonComplicanceService.nc.tipo_controle == "OP-PROD(ORDEM DE PRODUÇÃO PRODUTO ACABADO)" ||
      this.nonComplicanceService.nc.tipo_controle == "OP-SA(ORDEM DE PRODUÇÃO PRODUTO SEMIACABADO)" ||
      this.nonComplicanceService.nc.tipo_controle == "OP-I(ORDEM DE PRODUÇÃO CORTE)"
    ) {
      return true;
    } else {
      return false;
    }
  }

  returnNfScreen() {
    if (
      this.nonComplicanceService.nc.tipo_controle == "NF-e(NOTA FISCAL ELETRÔNICA)" ||
      this.nonComplicanceService.nc.tipo_controle == "PC(PEDIDO DE COMPRA)" ||
      this.nonComplicanceService.nc.tipo_controle == "PV(PEDIDO DE VENDA)" ||
      this.nonComplicanceService.nc.tipo_controle == "CC(COTAÇÃO COMERCIAL)"
    ) {
      return true;
    } else {
      return false;
    }
  }

  returnPrScreen() {
    if (this.nonComplicanceService.nc.tipo_controle == "PR(PROCEDIMENTO)") {
      return true;
    } else {
      return false;
    }
  }

  onUpload(event: any, name: string) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.nonComplicanceService.fileControle = files;
      for (var i = 0; i < files.length; i++) {
        let att = new Attachment();
        att.name = files[i].name;
        att.type = files[i].name.split(".")[1];
        att.path = name;
        this.nonComplicanceService.nc.attachments.push(att);
      }
    }
  }

  clearFileName(name: string) {
    for (var i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      if (this.nonComplicanceService.nc.attachments[i].path == name) {
        this.nonComplicanceService.nc.attachments.splice(i);
      }
    }

    this.nonComplicanceService.fileControle = [];
  }

  returnFiles(name: string): Attachment[] {
    let evidencias: Attachment[] = [];
    this.nonComplicanceService.nc.attachments.forEach((element) => {
      if (element.path == name) {
        evidencias.push(element);
      }
    });

    return evidencias;
  }

  openDialog() {
    const ref = this.dialogService.open(PrDialogComponent, {
      header: "Criar Instrução",
      width: "425px",
    });
  }

  onSelected() {
    this.nonComplicanceService.nc.procedure =
      this.nonComplicanceService.autoCompletePrValue;
  }
}
