import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualizarDocumentoDialogComponent } from 'src/app/pages/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component';
import { DateUtils } from 'src/app/utils/date-utils';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import {AboutService} from "../../about.service";

@Component({
  selector: 'app-view-identify-nc',
  templateUrl: './view-identify-n-c.component.html',
  styleUrls: ['./view-identify-n-c.component.css'],
  providers:[
    DialogService
  ],
})
export class ViewIdentifyNCComponent implements OnInit {
  images1= ["imagem1", "imagem2", "imagem3", "imagem4", "imagem5", "imagem1", "imagem2", "imagem3", "imagem4", "imagem5"];
  images2 = ["imagem1", "imagem2", "imagem3", "imagem4", "imagem5", "imagem1", "imagem2", "imagem3", "imagem4", "imagem5"];
  ncID = "001/2022";
  dataAbertura = this.aboutSrvc.nc?.data_fechamento;
  constructor(public dialogService: DialogService,public messageService:MessageService,public aboutSrvc: AboutService,public ncService:NonComplianceService) { }

  ngOnInit(): void {
    
  }

   returnTitle():string{
    if(this.aboutSrvc.nc?.tipos_parceiro_item == "Interno")
      return "Dados do Setor"
    return "Razão Social"
  }

  formato_brasileiro(data:Date | undefined | null): string {
    const dataFormatada = data ? DateUtils.formato_brasileiro(data) : '00/00/0000';
    return dataFormatada
  }
  isType1(element:any) {
    return element.path=="evidenciasNc";
  }
    isType2(element:any) {
        return element.path=="evidenciasAcoes";
    }

    visualizarDocumento(id:number,type:string){
      this.ncService.downloadFile(id).subscribe({
        next:(data)=>{
          
          const ref = this.dialogService.open(
            VisualizarDocumentoDialogComponent,
            {
              data: {
                base64: data.data,
                type:type,
              },
              header: "Visualizar Documento",
              width: "1000px",
            }
          );
        },error:(err)=>{
          this.messageService.add({
            severity: "error",
            summary: "Houve um problema ao visualizar arquivo.",
            life: 3000,
          });
        }
      })
    }
}
