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
    this.sgqServ.step2File = [];
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.sgqServ.step2File = files
    }
  }

}
