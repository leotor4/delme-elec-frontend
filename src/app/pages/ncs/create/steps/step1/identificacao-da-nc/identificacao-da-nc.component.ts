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

  public tiposNc: Array<String> = [
    "Auditoria Interna",
    "Auditoria Externa",
    "NC de Fornecedor",
    "NC de Processo",
    "NC de Cliente",
    "NC de Produto",
  ];

  public tiposAuditoria: Array<String> = ["Interna", "Externa"];

  ngOnInit(): void {
    
  }
teste(){
  console.log("consolelog" + this.nonComplicanceService.nc.tipos_local_item)
}
  

  checkAuditoria(tipoNc:any) {
    console.log(tipoNc, tipoNc == 'Auditoria Interna' || tipoNc == 'Auditoria Externa')
    var elementoAuditoria = document.getElementById('inputAuditoria')
    if(tipoNc == 'Auditoria Interna' || tipoNc == 'Auditoria Externa') {
      if(elementoAuditoria) {
        elementoAuditoria.removeAttribute('disabled')
      }
    } else {
      if(elementoAuditoria) {
        elementoAuditoria.setAttribute('disabled','')
        this.nonComplicanceService.nc.tipos_auditoria_item = ''
        this.nonComplicanceService.formIdentificacaoNC.setValue({
          tipos_auditoria_item : ''
        })
      }
    }
  }
}
