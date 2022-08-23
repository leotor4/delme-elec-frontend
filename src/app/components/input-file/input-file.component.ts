import { Component, OnInit } from '@angular/core';
import { Attachment } from 'src/app/models/attachment';
import { SgqService } from 'src/app/pages/ncs/sgq-evaluation/sgq.service';
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent implements OnInit {

  constructor(public sgqServ: SgqService,
              private messageService: MessageService,
              public translate: TranslateService) { }

  ngOnInit(): void {
  }
  clearFiles() {
    this.sgqServ.sgq.attachments = [];
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 2048) {
          this.messageService.add({
            severity: "error",
            summary: this.translate.instant("global.fileTooLarge"),
            life: 3000,
          });
          return

        }
      }
      this.sgqServ.step2File = files

      for (let i = 0; i < target.files.length; i++) {
        let att = new Attachment();
        att.name = files[i].name;
        att.type = files[i].name.split(".")[1];
        att.path = "sgq-files";
        this.sgqServ.sgq.attachments.push(att);
      }
    }

  }
  clearById(name: string) {
    let aux = this.sgqServ.sgq.attachments;
    this.sgqServ.sgq.attachments = [];
    for (let i = 0; i < aux.length; i++) {
      if (!(aux[i].name == name)) {
        this.sgqServ.sgq.attachments.push(aux[i]);
      }
    }
  }
}
