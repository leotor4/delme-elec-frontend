import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-ncs-create",
  templateUrl: "./ncs-create.component.html",
  styleUrls: ["./ncs-create.component.css"],
})
export class NcsCreateComponent implements OnInit {
  items: MenuItem[];
  constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      { label: "Identificar não conformidade" },
      { label: "Produtos e Pontos" },
      { label: "Partes Interessadas" },
      { label: "Revisar Informações" },
    ];
  }
}
