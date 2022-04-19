import { Injectable } from "@angular/core";

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
  public fileNc: any = [];
  public fileAcoes: any = [];
  public selected: any;

  constructor() {}
}
