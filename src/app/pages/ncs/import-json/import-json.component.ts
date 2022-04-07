import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import * as fs from "file-saver";
import { ActivatedRoute } from "@angular/router";

import {MessageService} from "primeng/api";
import {ImportService} from "./import.service";

@Component({
  selector: "app-provider",
  templateUrl: "./import-json.component.html",
  styleUrls: ["./import-json.component.css"],
  providers: [MessageService]
})
export class ImportJsonComponent implements OnInit {
  uploadedFile: File;
  convertedJson!: string;

  constructor(private messageService: MessageService, private importService: ImportService) {}

  ngOnInit(): void {
  }

  onUpload(event:any, type:string) {
    this.uploadedFile = event.files[0]
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(this.uploadedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        let convertedJson = JSON.stringify(data, undefined, 4);
        this.importService.post(convertedJson,type).subscribe();
      });
    };
    this.messageService.add({severity: 'success', summary: `Arquivo importado com sucesso`});
  }

  convertFile(file:File){

  }

  downloadFile(type:string): void {
    switch (type) {
      case "fornecedores":
        fs.saveAs(
            "./assets/files/exemplo_fornecedor.xlsx",
            "exemplo_fornecedor.xlsx"
        );
        break;
      case "clientes":
        fs.saveAs(
            "./assets/files/exemplo_cliente.xlsx",
            "exemplo_cliente.xlsx"
        );
        break;
      case "produtos":
        fs.saveAs(
            "./assets/files/exemplo_produto.xls",
            "exemplo_produto.xls"
        );
        break;
    }
  }


}
