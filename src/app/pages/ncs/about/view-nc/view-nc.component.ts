import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {
  VisualizarDocumentoDialogComponent
} from 'src/app/pages/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component';
import {DateUtils} from 'src/app/utils/date-utils';
import {NonComplianceService} from 'src/app/_services/non-compliance.service';
import {AboutService} from '../about.service';

@Component({
  selector: "app-view-nc",
  templateUrl: "./view-nc.component.html",
  styleUrls: ["./view-nc.component.css"],
  providers: [DialogService],
})
export class ViewNCComponent implements OnInit {
  ncID = "001/2022";
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  constructor(
    public aboutSrvc: AboutService,
    public ncService: NonComplianceService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}


  formato_brasileiro(data: Date | undefined | null): string {
    return data
        ? DateUtils.formato_brasileiro(data)
        : "00/00/0000";
  }
  isType1(element: any) {
    return element.path == "evidenciasNc";
  }
  isType2(element: any) {
    return element.path == "evidenciasAcoes";
  }

  visualizarDocumento(id: number, type: string) {
    this.ncService.downloadFile(id).subscribe({
      next: (data) => {
        const ref = this.dialogService.open(
          VisualizarDocumentoDialogComponent,
          {
            data: {
              base64: data.data,
              type: type,
            },
            header: "Visualizar Documento",
            width: "1000px",
          }
        );
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary: "Houve um problema ao visualizar arquivo.",
          life: 3000,
        });
      },
    });
  }
}
