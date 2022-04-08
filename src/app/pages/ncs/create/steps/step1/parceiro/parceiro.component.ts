import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-parceiro",
  templateUrl: "./parceiro.component.html",
  styleUrls: ["./parceiro.component.css"],
})
export class ParceiroComponent implements OnInit {
  constructor() {}

  public tiposParceiro: Array<String> = [
    "Selecione...",
    "Interno",
    "Cliente",
    "Fornecedor",
  ];

  public tiposParceiroItem = "";

  ngOnInit(): void {}
}
