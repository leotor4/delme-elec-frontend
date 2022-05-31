import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import * as fs from "file-saver";
import { ActivatedRoute } from "@angular/router";

import { MessageService } from "primeng/api";
import { ImportService } from "./import.service";
import { CustomerService } from "src/app/_services/customer.service";
import { UpdateDateService } from "src/app/_services/update-date.service";
import { SectorService } from "src/app/_services/sector.service";
import { ProviderService } from "src/app/_services/provider.service";
import { PlaceService } from "src/app/_services/place.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { Place } from "src/app/models/place";

@Component({
  selector: "app-provider",
  templateUrl: "./import-json.component.html",
  styleUrls: ["./import-json.component.css"],
  providers: [MessageService],
})
export class ImportJsonComponent implements OnInit {
  uploadedFile: File;
  convertedJson!: string;

  constructor(
    private messageService: MessageService,
    private importService: ImportService,
    public customerService: CustomerService,
    public updateService: UpdateDateService,
    public sectorService: SectorService,
    public placeService: PlaceService,
    public nonComplianceService: NonComplianceService,
    public providerService: ProviderService
  ) {}

  ngOnInit(): void {}

  onUpload(event: any, type: string) {
    this.uploadedFile = event.files[0];
    const fileReader = new FileReader();

    fileReader.readAsArrayBuffer(this.uploadedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: "binary" });
      workbook.SheetNames.forEach((sheet) => {
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        let convertedJson = JSON.stringify(data, undefined, 4);
        this.importService.post(convertedJson, type).subscribe(
          (value) => {
            this.attByType(type);
            this.importService.postUpdateTime().subscribe();
            this.messageService.add({
              severity: "success",
              summary: `Arquivo importado com sucesso`,
            });
          },
          (error) => {
            this.messageService.add({
              severity: "error",
              summary: `Erro ao importar arquivo`,
            });
          }
        );
      });
    };
  }

  convertFile(file: File) {}

  attByType(type: string) {
    switch (type) {
      case "customer":
        this.customerService.get().subscribe((data: any) => {
          this.nonComplianceService.customers = data.customers;
        });
        break;
      case "provider":
        this.providerService.get().subscribe((data: any) => {
          this.nonComplianceService.providers = data.providers;
        });
        break;
      case "sector":
        this.sectorService.get().subscribe((data: any) => {
          this.nonComplianceService.sectors = data.sectors;
        });
        break;
      case "place":
        this.placeService.get().subscribe((data: any) => {
          this.nonComplianceService.places = data.places.map(
            (item:Place) =>
              item.name
            );
          console.log('data places = ', this.nonComplianceService.places)
        });
        break;
    }
  }

  downloadFile(type: string): void {
    switch (type) {
      case "fornecedores":
        fs.saveAs(
          "./assets/files/exemplo_fornecedor.xlsx",
          "exemplo_fornecedor.xlsx"
        );
        break;
      case "local":
        fs.saveAs("./assets/files/exemplo_cliente.xlsx", "exemplo_local.xlsx");
        break;
      case "setor":
        fs.saveAs("./assets/files/exemplo_cliente.xlsx", "exemplo_setor.xlsx");
        break;
      case "clientes":
        fs.saveAs(
          "./assets/files/exemplo_cliente.xlsx",
          "exemplo_cliente.xlsx"
        );
        break;
      case "produtos":
        fs.saveAs("./assets/files/exemplo_produto.xls", "exemplo_produto.xlsx");
        break;

      case "instrucao":
        fs.saveAs("./assets/files/exemplo_produto.xls", "exemplo_instrução.xlsx");
        break;

        case "procedure":
        fs.saveAs("./assets/files/exemplo_produto.xls", "exemplo_procedimento.xlsx");
        break;
    }
  }
}
