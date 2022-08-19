import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api/messageservice";
import { elementAt } from "rxjs";
import { Attachment } from "src/app/models/attachment";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import {TranslateService} from "@ngx-translate/core";
import momentImported from 'moment';
const moment = momentImported;

@Component({
  selector: "app-descricao-nc",
  templateUrl: "./descricao-nc.component.html",
  styleUrls: ["./descricao-nc.component.css"],
})
export class DescricaoNcComponent implements OnInit {
  constructor(public nonComplicanceService: NonComplianceService, public translate: TranslateService) {}

  uploadedFile: File;

  ngOnInit(): void {
    console.log(this.nonComplicanceService.nc.radio_value)
  }

  clearFileName(name: string) {
    for (var i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      if (this.nonComplicanceService.nc.attachments[i].path == name) {
        this.nonComplicanceService.nc.attachments.splice(i,1);
      }
    }

    if (name == "evidenciasNc") {
      this.nonComplicanceService.fileNc = [];
    } else if (name == "evidenciasAcoes") {
      this.nonComplicanceService.fileAcoes = [];
    }
  }

  onUpload(event: any, name: string) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      if (name == "evidenciasNc") {
        this.nonComplicanceService.fileNc = files;
      } else if (name == "evidenciasAcoes") {
        this.nonComplicanceService.fileAcoes = files;
      }
      for (var i = 0; i < files.length; i++) {
        let att = new Attachment();
        att.name = files[i].name;
        att.type = files[i].name.split(".")[1];
        att.path = name;
        this.nonComplicanceService.nc.attachments.push(att);
      }
    }
  }

  returnFiles(name: string): Attachment[] {
    let evidencias: Attachment[] = [];
    this.nonComplicanceService.nc.attachments.forEach((element) => {
      
      if (element.path == name) {
        evidencias.push(element);
      }
    });
    return evidencias;
  }

    isRequired() {
        if(!this.nonComplicanceService.isType1or2()){
          return "*"
        } else return ""
    }

    ncTypeChange() {
      console.log(this.nonComplicanceService.nc.radio_value)
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

    }
}
