import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { Attachment } from "src/app/models/attachment";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { PrDialogComponent } from "../pr-dialog/pr-dialog.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-checkpoint-items",
  templateUrl: "./checkpoint-items.component.html",
  styleUrls: ["./checkpoint-items.component.css"],
  providers: [DialogService],
})
export class CheckpointItemsComponent implements OnInit {
  constructor(
    public nonComplicanceService: NonComplianceService,
    public dialogService: DialogService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}

  results: any;

  search(event: any) {
    let filtro = event.query;
    this.results = [];
    this.nonComplicanceService.procedures.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        this.results.push(element);
      }
    });

   
  }

  verificarExistencia(element: any, filtro: string): boolean {
    return element.code.toUpperCase().includes(filtro.toUpperCase()) ||
        element.rev.toUpperCase().includes(filtro.toUpperCase()) ||
        element.description.toUpperCase().includes(filtro.toUpperCase());

  }

  returnOpScreen() {
    return this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type1") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type2") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type3");
  }

  returnNfScreen() {
    return this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type4") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type5") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type6") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type7");
  }

  returnPrScreen() {
    return this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type8");
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
    for (let i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
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
      header: this.translate.instant("newNC.step1.checkpoint.createIT"),
      width: "425px",
    });
  }

  onSelected() {
    this.nonComplicanceService.nc.procedure =
      this.nonComplicanceService.autoCompletePrValue;
  }
}
