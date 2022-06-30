import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { NonCompliance } from "../../../../models/non-compliance";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-ncs-create-stepper",
  templateUrl: "./ncs-create-stepper.component.html",
  styleUrls: ["./ncs-create-stepper.component.css"],
})
export class NcsCreateStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 2;
  lastStepLabel = "Avançar";
  constructor(
    private router: Router,
    public nonComplianceService: NonComplianceService,
    private messageService: MessageService
  ) {}

  displayPdf = false;
  disableButton(): boolean {
    switch (this.stepPosition) {
      case 0:
        return this.nonComplianceService.avancarPasso1();
      case 1:
        return this.nonComplianceService.avancarPasso2();

      case 2:
        return false;
      case 3:
        return false;
      default:
        return false;
    }
  }

  ngOnInit() {
    this.items = [
      { label: "Dados da NC" },
      { label: "Descrição e Notificação da NC" },
      { label: "Visualização e Emissão da NC" },
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let labelName = isLastStep ? "Concluir" : "Avançar";

    return labelName;
  }
  getNextPageBtnIcon() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let iconClass = isLastStep ? "pi pi-upload" : "pi pi-arrow-right";
    return iconClass;
  }
  isFirstStep() {
    return this.stepPosition === 0 ? true : false;
  }
  isLastStep() {
    return this.stepPosition === this.items.length - 1 ? true : false;
  }

  nextStep() {
    if (this.isLastStep()) this.nonComplianceService.nc.status = "running";
    this.nonComplianceService.put().subscribe({
      next: (data) => {
        this.messageService.add({
          severity: "success",
          summary: this.isLastStep()
            ? "Não conformidade concluida com sucesso."
            : "Passo " + (this.stepPosition + 1) + " salvo com sucesso.",
          life: 3000,
        });

        if (this.isLastStep()) {
          this.nonComplianceService.nc = new NonCompliance();
          this.router.navigate(["/ncs/"]);
        }
        if (!this.isLastStep()) this.stepPosition++;
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary:
            "Houve um problema ao salvar dados do passo " +
            this.stepPosition +
            ".",
          life: 3000,
        });
        console.log(err);
      },
    });
  }
  backStep() {
    if (this.stepPosition <= 0) return;
    this.stepPosition--;
    this.isFirstStep();
  }
  changeStepByPosition(event: any) {
    this.stepPosition = event;
  }

  getLink() {
    if (this.isLastStep()) {
      return "/ncs";
    } else return;
  }

  gerarPdf() {
    this.displayPdf = true;
    setTimeout(this.generatePDF, 1000);
    setTimeout(() => {
      this.displayPdf = false;
    }, 1000);
  }

  generatePDF() {
    let data = document.getElementById("pdfContent");
    if (data) {
      var w = data.offsetWidth * 0.7;
      var h = data.offsetHeight * 0.7;

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
