import { Component, OnInit } from "@angular/core";
import { Place } from "src/app/models/place";
import { Sector } from "src/app/models/sector";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { PlaceService } from "src/app/_services/place.service";
import { SectorService } from "src/app/_services/sector.service";

@Component({
  selector: "app-identificacao-da-nc",
  templateUrl: "./identificacao-da-nc.component.html",
  styleUrls: ["./identificacao-da-nc.component.css"],
})
export class IdentificacaoDaNcComponent implements OnInit {
  constructor(
    public sectorService: SectorService,
    public placeService: PlaceService,
    public nonComplicanceService: NonComplianceService
  ) {}

  sectors!: Sector[];

  places!: Place[];

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

  ngOnInit(): void {
    this.sectorService.get().subscribe((data: any) => {
      this.sectors = data.sectors;
      console.log(this.sectors);
    });

    this.placeService.get().subscribe((data: any) => {
      this.places = data.places;
      console.log(this.places);
    });
  }
}
