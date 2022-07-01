import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import momentImported from 'moment';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

import { Attachment } from '../models/attachment';
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
import { ObjectUtils } from '../utils/object-utils';
import { IdentificacaoNCDTO } from './../pages/ncs/create/steps/step1/identificacao-da-nc/identificacao-nc-dto';
import { TokenStorageService } from "./token-storage.service";

const moment = momentImported;

@Injectable({
  providedIn: "root",
})
export class NonComplianceService {
  apiUrl = environment.apiURL + "noncompliances";

  public nc = new NonCompliance();

  public ncs: NonCompliance[] = [];

  public editarNomeItem = "";
  public editarEmailItem = "";
  public editarTelefoneItem = "";

  //passo 1
  customers: Customer[];
  sectors: Sector[];
  providers: Provider[];
  places!: Array<string>;
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


  msgHome:string;
  typeMsgHome:string

  public formIdentificacaoNC: FormGroup;
  public formParceiroNC: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private user: TokenStorageService) {
    this.criarFormularios();
  }

  private criarFormularios(): void {
		this.formIdentificacaoNC = this.fb.group({
			tipos_nc_item: [null,Validators.required],
			tipos_auditoria_item: [null],
			tipos_local_item: [null,Validators.required],
			data_abertura: [moment(new Date())],
      data_fechamento: [moment(new Date()).add('d', 30)],
      data_abertura_str: [moment(new Date()).format('yyyy-MM-DD')],
      data_fechamento_str: [moment(new Date()).add('d', 30).format('yyyy-MM-DD')]
		});

    this.formParceiroNC = this.fb.group({
			tipos_parceiro_item: [null],
			
		});
	}

  validarCheckpoint():boolean{
    if(this.nc.tipo_controle?.includes("OP")){
      return (!!this.nc.num_op) && !!this.nc.instruction;
    }

    if(this.nc.tipo_controle?.includes("NF-e(NOTA FISCAL ELETRÔNICA)")){
      return (!!this.nc.num_nota
        
        );
    }

    if(this.nc.tipo_controle == "PV(PEDIDO DE VENDA)" || this.nc.tipo_controle == "PC(PEDIDO DE COMPRA)" || this.nc.tipo_controle == "CC(COTAÇÃO COMERCIAL)"){
      return (!!this.nc.num_nota
        );
    }

      if(this.nc.tipo_controle == "PR(PROCEDIMENTO)"){
      return (
        !!this.nc.procedure
        );
    }
    return false;
  }

  closeNc(id:number){
    
     return this.http.put<any>(this.apiUrl + "/closeNc/" + id, {});
  }

  returnfiles(name:string){
    let files:Attachment[] = []
    this.nc.attachments.forEach(element =>{
      if(element.path == name)
        files.push(element)
    })

    return files;
  }




  avancarPasso1(): boolean {
    return !(this.formIdentificacaoNC.valid 
      && this.nc.partner 
      && this.validaProd()
      && this.nc.text_area_reject_point
      && this.nc.tipo_controle
      //&& this.validarAuditoria()  
      && this.validarCheckpoint()
      
      )
  }
  validaProd(){
    if(this.formIdentificacaoNC.value.tipos_nc_item=="NC de Produto"){
      return this.nc.product
          && this.nc.quant_nc
          && this.nc.quant_total
    } else {
      return true
    }
  }

   validaEvi() {
    if(this.formIdentificacaoNC.value.tipos_nc_item=="Auditoria Interna"||this.formIdentificacaoNC.value.tipos_nc_item=="Auditoria Externa"){
      return true
    } else {
      return this.returnfiles("evidenciasNc").length>0
    }
  }

  avancarPasso2(): boolean {
    return !(
      !!this.nc.radio_value 
      && !!this.nc.text_area_nc
      && !!this.nc.text_area_acoes
      && this.validaEvi()
    );
  }


  validarAuditoria():boolean {
    if (this.formIdentificacaoNC.value['tipos_nc_item'] && this.formIdentificacaoNC.value['tipos_auditoria_item']) {
      return true
    } 

    else if (this.formIdentificacaoNC.value['tipos_nc_item']) {
      var isInternaOrExterna = this.formIdentificacaoNC.value['tipos_nc_item'] == 'Auditoria Interna' || this.formIdentificacaoNC.value['tipos_nc_item'] == 'Auditoria Externa'
      if (!isInternaOrExterna) return true
    } 

    return false
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
    ObjectUtils.adicionar_campos<NonCompliance>(this.nc, this.formIdentificacaoNC.value);
    formData.append('data', JSON.stringify(this.nc));

    return this.http.put(this.apiUrl+ "/" + this.nc.id, formData)
  }

  saveNc() {
    let formData = new FormData();
    formData.append('data', JSON.stringify(this.nc));
    return this.http.put(this.apiUrl+ "/" + this.nc.id, formData)
  }

  
  abrirNc(){
    let formData = new FormData();
    formData.append('data',"{}")
    this.nc.issuer = this.user.getUser()
    return this.http.post(this.apiUrl, formData)
  }

  get(): Observable<NonCompliance[]> {
    return this.http.get<NonCompliance[]>(this.apiUrl);
  }

  getById(id: number): Observable<NonCompliance> {
    return this.http.get<NonCompliance>(this.apiUrl + "/" + id);
  }

  archived(id: number): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/arquivar/" + id, {});
  }

  delete(id: number): Observable<any> {
    return this.http.put<any>(this.apiUrl + "/delete/" + id, {});
  }

  hasProduct(): boolean {
    if (this.nc.product != null) return true;
    return false;
  }

  downloadFile(id:number){
    return this.http.get<any>(this.apiUrl + "/files/"+ id);
  }

  testeError() {
    return this.http.get<any>(this.apiUrl + "/teste");
  }
}
