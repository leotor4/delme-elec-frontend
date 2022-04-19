import { Component, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-descricao-nc",
  templateUrl: "./descricao-nc.component.html",
  styleUrls: ["./descricao-nc.component.css"],
})
export class DescricaoNcComponent implements OnInit {
  constructor(public nonComplicanceService: NonComplianceService) {}

  uploadedFile: File;
  fileNameNc: string[] = [];
  fileNameAcoes: string[] = [];

  ngOnInit(): void {}

  clearFileNameNc() {
    this.nonComplicanceService.fileNc = [];
  }

  clearFileNameAcoes() {
    this.nonComplicanceService.fileAcoes = [];
  }

  onUploadNc(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.nonComplicanceService.fileNc = files;
      for (let i = 0; i < files.length; i++) {
        this.fileNameNc.push(files[i].name);
      }
    }
  }

  onUploadAcoes(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.nonComplicanceService.fileAcoes = files;
      for (let i = 0; i < files.length; i++) {
        this.fileNameAcoes.push(files[i].name);
      }
    }
  }
}
