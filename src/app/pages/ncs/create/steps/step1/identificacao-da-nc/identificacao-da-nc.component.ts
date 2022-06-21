import { of } from 'rxjs/internal/observable/of';
import { Component, OnInit } from "@angular/core";
import { Place } from "src/app/models/place";
import { Sector } from "src/app/models/sector";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { PlaceService } from "src/app/_services/place.service";
import { SectorService } from "src/app/_services/sector.service";
import momentImported from 'moment'; 
const moment = momentImported;

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
   
    this.nonComplicanceService.formIdentificacaoNC.get("tipos_nc_item")?.valueChanges.subscribe(
      (item:string) => {
        if(item == 'NC de Fornecedor') {
          this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 60).toDate()
          this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
        } else {
          this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 30).toDate()
          this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
        }

        
        var elementoAuditoria = document.getElementById('inputAuditoria')

        if(item == 'Auditoria Interna' || item == 'Auditoria Externa') {
          if(elementoAuditoria) {
            elementoAuditoria.removeAttribute('disabled')
          }
        } else {
          if(elementoAuditoria) {
            elementoAuditoria.setAttribute('disabled','')
            this.nonComplicanceService.nc.tipos_auditoria_item = ''
            this.nonComplicanceService.formIdentificacaoNC.patchValue({
              tipos_auditoria_item : ''
            })
          }
        }
      }
    )
  }
teste(){
  console.log("consolelog" + this.nonComplicanceService.nc.tipos_local_item)
}
  

  setDtFechamentoFornecedor () {
    this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 60).toDate()
    return of([moment(new Date()).add('d', 60).format('yyyy-MM-DD')])
  }

  checkAuditoria(tipoNc:any) {
    var elementoAuditoria = document.getElementById('inputAuditoria')
    console.log(tipoNc)


   
    if(tipoNc == 'NC de Fornecedor') {

      this.setDtFechamentoFornecedor().subscribe((data:any) => {
        this.nonComplicanceService.formIdentificacaoNC.value['data_fechamento'] = data
        console.log(data)
        alert('AAAA')
      });
    }

    if(tipoNc == 'Auditoria Interna' || tipoNc == 'Auditoria Externa') {
      if(elementoAuditoria) {
        elementoAuditoria.removeAttribute('disabled')
      }
    } else {
      if(elementoAuditoria) {
        elementoAuditoria.setAttribute('disabled','')
        this.nonComplicanceService.nc.tipos_auditoria_item = ''
        this.nonComplicanceService.formIdentificacaoNC.patchValue({
          tipos_auditoria_item : ''
        })
      }
    }
  }
}
