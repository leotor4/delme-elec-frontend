import { Component, OnInit } from '@angular/core';
import {SgqService} from "../../sgq.service";
import {Attachment} from "../../../../../models/attachment";

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  constructor(public sgqServ: SgqService) { }

  ngOnInit(): void {
  }

  clearFiles() {
    this.sgqServ.sgq.attachments = [];
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
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
