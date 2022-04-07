import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identificacao-da-nc',
  templateUrl: './identificacao-da-nc.component.html',
  styleUrls: ['./identificacao-da-nc.component.css']
})
export class IdentificacaoDaNcComponent implements OnInit {

  constructor() { }
  public tiposNc:Array<String> = [
    "Selecione...",
    "Auditoria Interna",
    "Auditoria Externa",
    "Fornecedor",
    "NC de Processo",
    "NC de Cliente",
    "NC de Produto"
  ];

  public tiposAuditoria:Array<String> = [
    "Selecione...",
    "Interna",
    "Externa"
  ];

  public tiposLocalSetor:Array<String> = [
    "Selecione...",
    "local 1",
    "local 2",
    "local 3",
    "setor 1",
    "setor 2",
    "setor 3",
  ];

  public tiposNcItem = "Selecione...";
  public tiposAuditoriaItem = "Selecione...";
  public tiposLocalItem = "Selecione...";
  public dataAbertura = "";
  public dataFechamento = "";

  
  ngOnInit(): void {
  }

}
