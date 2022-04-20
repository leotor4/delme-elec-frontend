import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";

@Injectable({
  providedIn: "root",
})
export class NonComplianceService {
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

  constructor() {}
}
