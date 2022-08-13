import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { VisualizarDocumentoDialogComponent } from 'src/app/pages/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component';
import { DateUtils } from 'src/app/utils/date-utils';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import {AboutService} from "../../about.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-view-identify-nc",
  templateUrl: "./view-identify-n-c.component.html",
  styleUrls: ["./view-identify-n-c.component.css"],
  providers: [DialogService],
})
export class ViewIdentifyNCComponent implements OnInit {
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    public aboutSrvc: AboutService,
    public ncService: NonComplianceService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}

  returnTitle(): string {
    if (this.aboutSrvc.nc?.tipos_parceiro_item == "Interno")
      return this.translate.instant("newNC.review.sector");
    return this.translate.instant("newNC.review.corporateName");
  }

  formato_brasileiro(data: Date | undefined | null): string {
    const dataFormatada = data
      ? DateUtils.formato_brasileiro(data)
      : "00/00/0000";
    return dataFormatada;
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

  haveSegment(): boolean {
    if (this.aboutSrvc.nc.tipos_auditoria_item) {
      return true;
    }
    return false;
  }
}
