import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Router} from "@angular/router";
import {MenuItem, MessageService} from "primeng/api";
import {NonComplianceService} from "src/app/_services/non-compliance.service";
import {NonCompliance} from "../../../../models/non-compliance";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-ncs-create-stepper",
  templateUrl: "./ncs-create-stepper.component.html",
  styleUrls: ["./ncs-create-stepper.component.css"],
})
export class NcsCreateStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 0;
  displayPdf = false;
  @ViewChild('divToScroll') divToScroll: ElementRef;

  constructor(
    private router: Router,
    public nonComplianceService: NonComplianceService,
    private messageService: MessageService,
    public translate: TranslateService
  ) {}

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
      { label: this.translate.instant("newNC.stepper.step1Label") },
      { label: this.translate.instant("newNC.stepper.step2Label") },
      { label: this.translate.instant("newNC.stepper.step3Label") },
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    return isLastStep
      ? this.translate.instant("global.finish")
      : this.translate.instant("global.next");
  }

  getNextPageBtnIcon() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    return isLastStep ? "pi pi-upload" : "pi pi-arrow-right";
  }
  isFirstStep() {
    return this.stepPosition === 0;
  }
  isLastStep() {
    return this.stepPosition === this.items.length - 1;
  }

  nextStep() {
    if (this.isLastStep()) this.nonComplianceService.nc.status = "running";
    this.nonComplianceService.put().subscribe({
      next: (data) => {
        this.messageService.add({
          severity: "success",
          summary: this.isLastStep()
            ? this.translate.instant("newNC.finished")
            : this.translate.instant("global.step") +
              (this.stepPosition + 1) +
              this.translate.instant("global.saved"),
          life: 3000,
        });

        if (this.isLastStep()) {
          this.nonComplianceService.nc = new NonCompliance();
          this.router.navigate(["/ncs/"]);
        }
        if (!this.isLastStep()) {
          this.stepPosition++
          this.divToScroll.nativeElement.scrollTop = 0;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: "error",
          summary:
            this.translate.instant("global.error") + this.stepPosition + ".",
          life: 3000,
        });
      },
    });
  }
  backStep() {
    if (this.stepPosition <= 0) return;
    this.stepPosition--;
    this.divToScroll.nativeElement.scrollTop = 0;
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
    this.nonComplianceService.displayPdf = true;
    setTimeout(this.generatePDF, 1000);
    setTimeout(() => {
      this.nonComplianceService.displayPdf = false;
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
