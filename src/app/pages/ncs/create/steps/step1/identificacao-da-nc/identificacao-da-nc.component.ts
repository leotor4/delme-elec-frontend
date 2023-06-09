import { of } from "rxjs/internal/observable/of";
import { Component, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import momentImported from "moment";
const moment = momentImported;
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-identificacao-da-nc",
  templateUrl: "./identificacao-da-nc.component.html",
  styleUrls: ["./identificacao-da-nc.component.css"],
})
export class IdentificacaoDaNcComponent implements OnInit {
  constructor(
    public nonComplicanceService: NonComplianceService,
    public translate: TranslateService
  ) {}

  public tiposNc: Array<String> = [
    this.translate.instant("newNC.step1.ncType.type1"),
    this.translate.instant("newNC.step1.ncType.type2"),
    this.translate.instant("newNC.step1.ncType.type3"),
    this.translate.instant("newNC.step1.ncType.type4"),
    this.translate.instant("newNC.step1.ncType.type5"),
    this.translate.instant("newNC.step1.ncType.type6"),
  ];
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
    });
    console.log('a')

    this.nonComplicanceService.formIdentificacaoNC.get("tipos_nc_item")?.valueChanges.subscribe(
      (item:string) => {
        switch (this.nonComplicanceService.nc.radio_value) {
          case "val1":
            if (this.nonComplicanceService.formIdentificacaoNC.get("tipos_nc_item")?.value == this.translate.instant("newNC.step1.ncType.type3")) {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 60).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            } else {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 30).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            }
            break;
          case "val2":
            if (this.nonComplicanceService.formIdentificacaoNC.get("tipos_nc_item")?.value == this.translate.instant("newNC.step1.ncType.type3")) {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 30).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            } else {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 15).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            }
            break;
          case "val3":
            if (this.nonComplicanceService.formIdentificacaoNC.get("tipos_nc_item")?.value == this.translate.instant("newNC.step1.ncType.type3")) {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 15).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            } else {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 7).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            }
            break;
          case "val4":
            if (this.nonComplicanceService.formIdentificacaoNC.get("tipos_nc_item")?.value == this.translate.instant("newNC.step1.ncType.type3")) {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 15).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            } else {
              this.nonComplicanceService.nc.data_fechamento = moment(new Date()).add('d', 7).toDate()
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento))
              this.nonComplicanceService.formIdentificacaoNC.get('data_fechamento_str')?.setValue(moment(this.nonComplicanceService.nc.data_fechamento).format('yyyy-MM-DD'))
            }
            break;
        }


        var elementoAuditoria = document.getElementById('inputAuditoria')

        if(item == this.translate.instant("newNC.step1.ncType.type1") || item == this.translate.instant("newNC.step1.ncType.type2")) {
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
    console.log(this.nonComplicanceService.nc.tipos_local_item)
  }

  /*setDtFechamentoFornecedor () {
    this.nonComplicanceService.nc.data_fechamento = moment().add('d', 60).toDate()
    this.nonComplicanceService.formIdentificacaoNC.value['data_fechamento'] = this.nonComplicanceService.nc.data_fechamento
    return of([moment().add('d', 60).format('yyyy-MM-DD')])
  }

  checkAuditoria(tipoNc:any) {
    let elementoAuditoria = document.getElementById('inputAuditoria')

    if(tipoNc == this.translate.instant("newNC.step1.ncType.type3")) {

      this.setDtFechamentoFornecedor().subscribe((data:any) => {
        this.nonComplicanceService.formIdentificacaoNC.value['data_fechamento_str'] = data
      });
    }

    if(tipoNc == this.translate.instant("newNC.step1.ncType.type1")  || tipoNc == this.translate.instant("newNC.step1.ncType.type2") ) {
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
  }*/
}
