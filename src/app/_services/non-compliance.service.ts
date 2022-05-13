import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contact } from "../models/contact.model";
import { Customer } from "../models/customer";
import { Instruction } from "../models/instruction";
import { NonCompliance } from "../models/non-compliance";
import { Place } from "../models/place";
import { Procedure } from "../models/procedure";
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
  public ncs: NonCompliance[] = [];

  //passo 1
  customers: Customer[];
  sectors: Sector[];
  providers: Provider[];
  places!: Place[];
  updates: UpdateDate;

  pesquisar: string = "";
  public fileNc: any = [];
  public fileAcoes: any = [];

  //passo 2
  public fileProduct: any = [];
  public fileControle: any = [];
  public instructions: Instruction[];
  public procedures: Procedure[];
  public selectedProduct: Product;

  public autoCompleteValue: string = "";
  public autoCompletePrValue: any;
  public autoCompleteItValue: any;
  public controlNumber: string = "";
  public selectedIt: any;
  public selectedPr: any;

  //passo 3
  allContacts: Contact[];

  hasSelectedProduct: boolean;

  avancarPasso1(): boolean {
    return !(
      !!this.nc.tipos_nc_item &&
      !!this.nc.tipos_auditoria_item &&
      !!this.nc.tipos_local_item &&
      !!this.nc.data_abertura &&
      !!this.nc.data_fechamento &&
      !!this.nc.tipos_parceiro_item &&
      !!this.nc.text_area_nc &&
      !!this.nc.text_area_acoes &&
      !!this.nc.partner &&
      this.fileNc.length > 0 &&
      this.fileAcoes.length > 0
    );
  }

  avancarPasso2(): boolean {
    return !(
      !!this.nc.quant_nc &&
      !!this.nc.quant_total &&
      !!this.selectedProduct
    );
  }

  uploadFiles(formData: any) {
    for (var i = 0; i < this.fileNc.length; i++) {
      formData.append("fileNc[]", this.fileNc[i], this.fileNc[i].name);
    }

    for (var i = 0; i < this.fileAcoes.length; i++) {
      formData.append("fileAcoes[]", this.fileAcoes[i], this.fileAcoes[i].name);
    }

    for (var i = 0; i < this.fileControle.length; i++) {
      formData.append(
        "fileControle[]",
        this.fileControle[i],
        this.fileControle[i].name
      );
    }
  }

  post() {
    let formData = new FormData();
    this.uploadFiles(formData);

    formData.append("data", JSON.stringify(this.nc));

    return this.http.post(this.apiUrl, formData)
  }

  put() {
    let formData = new FormData();
    this.uploadFiles(formData);
    console.log("ID:" + this.nc.id)
    formData.append("data", JSON.stringify(this.nc));

    return this.http.put(this.apiUrl+ "/" + this.nc.id, formData)
  }
  
  
  abrirNc(){
    let formData = new FormData();
    formData.append('data',"{}")
    return this.http.post(this.apiUrl, formData)
  }

  get(): Observable<NonCompliance[]> {
    return this.http.get<NonCompliance[]>(this.apiUrl);
  }

  getById(id: number): Observable<NonCompliance> {
    return this.http.get<NonCompliance>(this.apiUrl + "/" + id);
  }

  archived(id: number): Observable<any> {
    alert(this.apiUrl + "/arquivar/" + id);
    return this.http.put<any>(this.apiUrl + "/arquivar/" + id, {});
  }

  delete(id: number): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/delete/" + id, {});
  }

  hasProduct(): boolean {
    if (this.nc.product != null) return true;
    return false;
  }

  constructor(private http: HttpClient) {}
}
