import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-descricao-nc",
  templateUrl: "./descricao-nc.component.html",
  styleUrls: ["./descricao-nc.component.css"],
})
export class DescricaoNcComponent implements OnInit {
  uploadedFile: File;
  fileNameNc: string[] = [];
  fileNameAcoes: string[] = [];
  textAreaNc: String;
  textAreaAcoes: String;
  constructor() {}

  ngOnInit(): void {}

  clearFileNameNc() {
    this.fileNameNc = [];
  }
  clearFileNameAcoes() {
    this.fileNameAcoes = [];
  }
  onUploadNc(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      for (let i = 0; i < files.length; i++) {
        this.fileNameNc.push(files[i].name);
      }
    }
  }

  onUploadAcoes(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      for (let i = 0; i < files.length; i++) {
        this.fileNameAcoes.push(files[i].name);
      }
    }
  }
}
