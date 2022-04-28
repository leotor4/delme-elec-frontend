import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";
import { Customer } from "../models/customer";
import { NonCompliance } from "../models/non-compliance";
import { Place } from "../models/place";
import { Product } from "../models/product.model";
import { Provider } from "../models/provider";
import { Sector } from "../models/sector";
import { UpdateDate } from "../models/update-date";

@Injectable({
  providedIn: "root",
})
export class NonComplianceService {
  apiUrl = "http://localhost:3333/noncompliances";

  public nc = new NonCompliance();

  //passo 1
  customers: Customer[];
  sectors: Sector[];
  providers: Provider[];
  places!: Place[];
  updates: UpdateDate;

  pesquisar: string = "";
  fileNc: any = [];
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

  //passo 3
  allContacts: Contact[];

  hasSelectedProduct: boolean;

  avancarPasso1(): boolean {
    return !(
      !!this.nc.tiposNcItem &&
      !!this.nc.tiposAuditoriaItem &&
      !!this.nc.tiposLocalItem &&
      !!this.nc.dataAbertura &&
      !!this.nc.dataFechamento &&
      !!this.nc.tiposParceiroItem &&
      !!this.nc.textAreaNc &&
      !!this.nc.textAreaAcoes &&
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
    this.nc.partnerId = this.selected.id;
    formData.append("data", JSON.stringify(this.nc));
    this.http.post(this.apiUrl, formData).subscribe((response) => {});
  }

  constructor(private http: HttpClient) {}
}
