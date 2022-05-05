import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";

import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { ItDialogComponent } from "../it-dialog/it-dialog.component";

@Component({
  selector: "app-rejection-point-items",
  templateUrl: "./rejection-point-items.component.html",
  styleUrls: ["./rejection-point-items.component.css"],
  providers: [DialogService],
})
export class RejectionPointItemsComponent implements OnInit {
  constructor(
    public nonComplianceService: NonComplianceService,
    public dialogService: DialogService
  ) {}

  results: any[];

  onSelected() {
    this.nonComplianceService.nc.instruction =
      this.nonComplianceService.autoCompleteItValue;
  }

  search(event: any) {
    var filtro = event.query;
    this.results = [];
    this.nonComplianceService.instructions.forEach((element) => {
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
      this.nonComplianceService.nc.tipo_controle == "OP-PROD" ||
      this.nonComplianceService.nc.tipo_controle == "OP-SA" ||
      this.nonComplianceService.nc.tipo_controle == "OP-I"
    ) {
      return true;
    } else {
      return false;
    }
  }

  returnNfScreen() {
    if (this.nonComplianceService.nc.tipo_controle == "NF-e") {
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
  ngOnInit(): void {}
}
