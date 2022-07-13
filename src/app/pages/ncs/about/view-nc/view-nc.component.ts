import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {
  VisualizarDocumentoDialogComponent
} from 'src/app/pages/dialogs/visualizar-documento-dialog/visualizar-documento-dialog.component';
import {DateUtils} from 'src/app/utils/date-utils';
import {NonComplianceService} from 'src/app/_services/non-compliance.service';
import {AboutService} from '../about.service';
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

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
  displayPdf = false;
  constructor(
    public aboutSrvc: AboutService,
    public ncService: NonComplianceService,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {}
  gerarPdf() {
    this.displayPdf = true;
    setTimeout(this.generatePDF, 1000);
    setTimeout(() => {
      this.displayPdf = false;
    }, 1000);
  }

  formato_brasileiro(data: Date | undefined | null): string {
    return data ? DateUtils.formato_brasileiro(data) : "00/00/0000";
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

  generatePDF() {
    let data = document.getElementById("pdfContent");
    if (data) {
      let w = data.offsetWidth * 0.7;
      let h = data.offsetHeight * 0.7;

      html2canvas(data, {}).then((canvas) => {
        this.displayPdf = false;
        if (data) {
          let HTML_Width = w;
          let HTML_Height = h;
          let top_left_margin = 15;
          let PDF_Width = HTML_Width + top_left_margin * 2;
          let PDF_Height = PDF_Width * 1.5 + top_left_margin * 2;
          let canvas_image_width = HTML_Width;
          let canvas_image_height = HTML_Height;
          let totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;
          totalPDFPages = totalPDFPages;
          canvas.getContext("2d");
          let imgData = canvas.toDataURL("image/png", 1.0);
          let pdf = new jspdf.jsPDF("p", "pt", [PDF_Width, PDF_Height]);
          pdf.addImage(
            imgData,
            "PNG",
            top_left_margin,
            top_left_margin,
            canvas_image_width,
            canvas_image_height
          );
          for (let i = 1; i <= totalPDFPages; i++) {
            pdf.addPage([PDF_Width, PDF_Height], "p");
            pdf.addImage(
              imgData,
              "PNG",
              top_left_margin,
              -(PDF_Height * i) + top_left_margin * 4,
              canvas_image_width,
              canvas_image_height
            );
          }

          pdf.save("HTML-Document.pdf");
        }
      });
    }
  }
}
