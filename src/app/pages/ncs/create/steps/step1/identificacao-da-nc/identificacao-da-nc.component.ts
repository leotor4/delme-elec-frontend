import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-identificacao-da-nc",
  templateUrl: "./identificacao-da-nc.component.html",
  styleUrls: ["./identificacao-da-nc.component.css"],
})
export class IdentificacaoDaNcComponent implements OnInit {
  constructor() {}
  public tiposNc: Array<String> = [
    "Auditoria Interna",
    "Auditoria Externa",
    "Fornecedor",
    "NC de Processo",
    "NC de Cliente",
    "NC de Produto",
  ];

  public tiposAuditoria: Array<String> = ["Interna", "Externa"];

  public tiposLocalSetor: Array<String> = [
    "local 1",
    "local 2",
    "local 3",
    "setor 1",
    "setor 2",
    "setor 3",
  ];

  public tiposNcItem = "";
  public tiposAuditoriaItem = "";
  public tiposLocalItem = "";
  public dataAbertura = "";
  public dataFechamento = "";

  ngOnInit(): void {}
}
