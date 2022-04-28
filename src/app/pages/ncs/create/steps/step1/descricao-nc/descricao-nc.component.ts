import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api/messageservice";
import { elementAt } from "rxjs";
import { Attachment } from "src/app/models/attachment";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-descricao-nc",
  templateUrl: "./descricao-nc.component.html",
  styleUrls: ["./descricao-nc.component.css"],
})
export class DescricaoNcComponent implements OnInit {
  constructor(public nonComplicanceService: NonComplianceService) {}

  uploadedFile: File;

  ngOnInit(): void {}

  clearFileNameNc() {
    for (var i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      if (this.nonComplicanceService.nc.attachments[i].path == "evidenciasNc") {
        this.nonComplicanceService.nc.attachments.splice(i);
      }
    }
    this.nonComplicanceService.fileNc = [];
  }

  clearFileNameAcoes() {
    for (var i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      if (
        this.nonComplicanceService.nc.attachments[i].path == "evidenciasAcoes"
      ) {
        this.nonComplicanceService.nc.attachments.splice(i);
      }
    }
    this.nonComplicanceService.fileAcoes = [];
  }

  onUploadNc(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.nonComplicanceService.fileNc = files;
      for (var i = 0; i < files.length; i++) {
        let att = new Attachment();
        att.name = files[i].name;
        att.type = files[i].name.split(".")[1];
        att.path = "evidenciasNc";
        this.nonComplicanceService.nc.attachments.push(att);
      }
    }
  }

  returnEvidenciasFile(): Attachment[] {
    let evidencias: Attachment[] = [];
    this.nonComplicanceService.nc.attachments.forEach((element) => {
      if (element.path == "evidenciasNc") {
        evidencias.push(element);
      }
    });

    return evidencias;
  }

  returnAcoesFile(): Attachment[] {
    let evidencias: Attachment[] = [];
    this.nonComplicanceService.nc.attachments.forEach((element) => {
      if (element.path == "evidenciasAcoes") {
        evidencias.push(element);
      }
    });

    return evidencias;
  }

  onUploadAcoes(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.nonComplicanceService.fileAcoes = files;
      for (var i = 0; i < files.length; i++) {
        let att = new Attachment();
        att.name = files[i].name;
        att.type = files[i].name.split(".")[1];
        att.path = "evidenciasAcoes";
        this.nonComplicanceService.nc.attachments.push(att);
      }
    }
  }
}
