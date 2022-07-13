import {Component, Input, OnInit} from '@angular/core';
import {AboutService} from "../about.service";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
@Component({
  selector: "app-about-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  item = "";
  constructor(public aboutSrvc: AboutService) {}

  ngOnInit(): void {}
  gerarPdf() {
    this.aboutSrvc.displayPdf = true;
    setTimeout(this.generatePDF, 1000);
    setTimeout(() => {
      this.aboutSrvc.displayPdf = false;
    }, 1000);
  }
  generatePDF() {
    let data = document.getElementById("pdfContent");
    if (data) {
      let w = data.offsetWidth * 0.7;
      let h = data.offsetHeight * 0.7;

      html2canvas(data, {}).then((canvas) => {
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
