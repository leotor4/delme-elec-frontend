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

  ngOnInit(): void {
    
  }

  clearFileName(name: string) {
    for (var i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      if (this.nonComplicanceService.nc.attachments[i].path == name) {
        this.nonComplicanceService.nc.attachments.splice(i,1);
      }
    }

    if (name == "evidenciasNc") {
      this.nonComplicanceService.fileNc = [];
    } else if (name == "evidenciasAcoes") {
      this.nonComplicanceService.fileAcoes = [];
    }
  }

  onUpload(event: any, name: string) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      if (name == "evidenciasNc") {
        this.nonComplicanceService.fileNc = files;
      } else if (name == "evidenciasAcoes") {
        this.nonComplicanceService.fileAcoes = files;
      }
      for (var i = 0; i < files.length; i++) {
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

    isRequired() {
        if(!this.nonComplicanceService.isType1or2()){
          return "*"
        } else return ""
    }
}
