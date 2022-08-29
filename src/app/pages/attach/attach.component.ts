import { Component, Input, OnInit } from "@angular/core";
import { Attachment } from "src/app/models/attachment";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-attach",
  templateUrl: "./attach.component.html",
  styleUrls: ["./attach.component.css"],
})
export class AttachComponent implements OnInit {
  constructor(public nonComplicanceService: NonComplianceService,
              private messageService: MessageService,
              public translate: TranslateService) {}
  @Input() item = ""; // decorate the property with @Input()

  ngOnInit(): void {}

  clearFileName(name: string) {
    for (var i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      if (this.nonComplicanceService.nc.attachments[i].path == name) {
        this.nonComplicanceService.nc.attachments.splice(i, 1);
      }
    }

    if (name == "evidenciasNc") {
      this.nonComplicanceService.fileNc = [];
    } else if (name == "evidenciasAcoes") {
      this.nonComplicanceService.fileAcoes = [];
    }
  }

  clearFileByName(name: string) {
    for (var i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      let attach = this.nonComplicanceService.nc.attachments[i];
      console.log(name);
      if (attach.path == this.item && attach.name == name) {
        
        this.nonComplicanceService.nc.attachments.splice(i, 1);
      }
    }
  }

  onUpload(event: any, name: string) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      let files = target.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 2098000) {
          this.messageService.add({
            severity: "error",
            summary: this.translate.instant("global.fileTooLarge"),
            life: 3000,
          });
          return

        }
      }
      if (name == "evidenciasNc") {
        this.nonComplicanceService.fileNc = files;
      } else if (name == "evidenciasAcoes") {
        this.nonComplicanceService.fileAcoes = files;
      }
      for (let i = 0; i < files.length; i++) {
        let att = new Attachment();
        att.name = files[i].name;
        att.type = files[i].name.split(".")[1];
        att.path = name;
        this.nonComplicanceService.nc.attachments.push(att);
      }
    }
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
}
