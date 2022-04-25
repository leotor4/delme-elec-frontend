import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Contact } from "../models/contact.model";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class NonComplianceService {
  apiUrl = "http://localhost:3333/noncompliances";
  //passo 1
  public tiposNcItem = "";
  public tiposAuditoriaItem = "";
  public tiposLocalItem = "";
  public dataAbertura = "";
  public dataFechamento = "";
  public tiposParceiroItem = "";
  public textAreaNc = "";
  public textAreaAcoes = "";
  public pesquisar = "";
  public fileNc: any = [];
  public fileAcoes: any = [];
  public isSelected = false;
  public selected: any;

  //passo 2
  public quantNc = "";
  public quantTotal = "";
  public fileProduct: any = [];
  public selectedProduct: Product;
  public radioButtonValue: string = "val1";
  public textAreaRejectPoint: String = "";
  public autoCompleteValue: string = "";
  public controlNumber: string = "";

  hasSelectedProduct: boolean;

  //passo 3
  contactsList: Contact[] = [];

  avancarPasso1(): boolean {
    return !(
      !!this.tiposNcItem &&
      !!this.tiposAuditoriaItem &&
      !!this.tiposLocalItem &&
      !!this.dataAbertura &&
      !!this.dataFechamento &&
      !!this.tiposParceiroItem &&
      !!this.textAreaNc &&
      !!this.textAreaAcoes &&
      !!this.selected &&
      this.fileNc.length > 0 &&
      this.fileAcoes.length > 0
    );
  }

  avancarPasso2(): boolean {
    return !(!!this.quantNc && !!this.quantTotal && !!this.selectedProduct);
  }

  uploadFiles(formData: any) {
    for (var i = 0; i < this.fileNc.length; i++) {
      formData.append("fileNc[]", this.fileNc[i], this.fileNc[i].name);
    }

    for (var i = 0; i < this.fileAcoes.length; i++) {
      formData.append("fileAcoes[]", this.fileAcoes[i], this.fileAcoes[i].name);
    }
  }

  post() {
    let formData = new FormData();
    this.uploadFiles(formData);
    this.http.post(this.apiUrl, formData).subscribe((response) => {
      console.log("response received is ", response);
    });
  }

  constructor(private http: HttpClient) {}
}
