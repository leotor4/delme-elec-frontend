import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem } from "primeng/api";
import { NonCompliance } from "src/app/models/non-compliance";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-ncs-create",
  templateUrl: "./ncs-create.component.html",
  styleUrls: ["./ncs-create.component.css"],
})
export class NcsCreateComponent implements OnInit {
  items: MenuItem[];
  constructor(private router: Router,public ncService:NonComplianceService) {}
  
  ngOnDestroy(): void {
    this.ncService.nc = new NonCompliance()
  }

  ngOnInit() {
    this.items = [
      { label: "Identificar não conformidade" },
      { label: "Produtos e Pontos" },
      { label: "Partes Interessadas" },
      { label: "Revisar Informações" },
    ];
  }
}
