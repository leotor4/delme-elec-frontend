import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { ActivatedRoute } from "@angular/router";
import { CustomerService } from "src/app/_services/customer.service";
import { ProductService } from "src/app/_services/product.service";
import { ProviderService } from "src/app/_services/provider.service";
@Component({
  selector: "app-provider",
  templateUrl: "./import-json.component.html",
  styleUrls: ["./import-json.component.css"],
})
export class ImportJsonComponent implements OnInit {
  convertedJson!: string;
  fileName: string;
  importTypes = ["Fornecedor", "Clientes", "Produtos"];
  importType: string;
  importTypeId: number;

  constructor(
    private route: ActivatedRoute,
    public customerService: CustomerService,
    public productService: ProductService,
    public ProviderService: ProviderService
  ) {}

  ngOnInit(): void {
    this.importTypeId = Number(this.route.snapshot.paramMap.get("id"));
    this.getTypeName();
  }

  getTypeName() {
    this.importType = this.importTypes[this.importTypeId];
  }
  handleFileUpdate(event: any): void {
    const selectedFile = event.target.files[0];
    this.fileName = selectedFile.name;
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(selectedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = XLSX.read(binaryData, { type: "binary" });
      workbook.SheetNames.forEach((sheet: any) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.convertedJson = JSON.stringify(data, undefined, 4);
      });
    };
  }

  sendJson() {
    switch (this.importType) {
      case "Fornecedor":
        this.ProviderService.post(this.convertedJson).subscribe();
        break;
      case "Clientes":
        this.customerService.post(this.convertedJson).subscribe();
        break;
      case "Produtos":
        this.productService.post(this.convertedJson).subscribe();
        break;
    }
  }

  downloadFile(): void {
    switch (this.importType) {
      case "Fornecedor":
        saveAs(
          "./assets/files/exemplo_fornecedor.xlsx",
          "exemplo_fornecedor.xlsx"
        );
        break;
      case "Clientes":
        saveAs("./assets/files/exemplo_cliente.xlsx", "exemplo_cliente.xlsx");
        break;
      case "Produtos":
        saveAs("./assets/files/exemplo_produtos.xlsx", "exemplo_produtos.xlsx");
        break;
    }
  }
}
