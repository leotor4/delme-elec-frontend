import { Component, OnInit } from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SgqService} from "../../../sgq.service";
import {
  VisualizarDocumentoDialogComponent
} from "../../../../../dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component";
import {AboutService} from "../../../../about/about.service";
import {MessageService} from "primeng/api";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-nc-info',
  templateUrl: './nc-info.component.html',
  styleUrls: ['./nc-info.component.css'],
  providers:[
    DialogService
  ]
})
export class NcInfoComponent implements OnInit {
  nc:any = {}
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public sgqServ: SgqService,
              public aboutSrvc: AboutService,
              public dialogService: DialogService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.nc = this.config.data.nc
  }

  closeDialog(flag: boolean) {
    this.ref.close(flag)
  }
  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }

  visualizarDocumento(id:number,type:string){
    this.aboutSrvc.viewFile(id).subscribe({
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

  getUrl(){
    return environment.apiURL
  }
}
