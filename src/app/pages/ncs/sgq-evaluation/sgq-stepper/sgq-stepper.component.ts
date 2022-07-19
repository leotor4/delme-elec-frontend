import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import { MenuItem, MessageService } from "primeng/api";
import { NonComplianceService } from "../../../../_services/non-compliance.service";
import { SgqService } from "../sgq.service";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-sgq-stepper",
  templateUrl: "./sgq-stepper.component.html",
  styleUrls: ["./sgq-stepper.component.css"],
})
export class SgqStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 0;
  lastStepLabel = this.translate.instant("global.next");
  @ViewChild('divToScroll') divToScroll: ElementRef;

  constructor(
    public sgqSrv: SgqService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService
  ) {}

  disableButton(): boolean {
    switch (this.stepPosition) {
      case 0:
        return this.sgqSrv.avancarPasso1();
      case 1:
        return this.sgqSrv.avancarPasso2();
      default:
        return false;
    }
  }

  ngOnInit() {
    this.items = [
      { label: this.translate.instant("sgq.steps.step1.stepTitle") },
      { label: this.translate.instant("sgq.steps.step2.stepTitle") },
      { label: this.translate.instant("sgq.steps.step3.stepTitle") },
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let labelName = isLastStep
      ? this.translate.instant("global.finishTest")
      : this.translate.instant("global.next");
    return labelName;
  }
  getNextPageBtnIcon() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let iconClass = isLastStep
      ? "bi bi-file-earmark-medical"
      : "pi pi-arrow-right";
    return iconClass;
  }
  isFirstStep() {
    return this.stepPosition === 0 ? true : false;
  }
  nextStep() {
    let id = parseInt(this.route.snapshot.paramMap.get("id") || "");

    this.sgqSrv.put().subscribe({
      next: (data: any) => {
        this.messageService.add({
          severity: "success",
          summary:
            this.translate.instant("global.step") +
            (this.stepPosition + 1) +
            this.translate.instant("global.saved"),
          life: 3000,
        });
        this.stepPosition >= this.items.length - 1
          ? this.router.navigateByUrl("/ncs/about/" + id)
          : this.stepPosition++;
        this.divToScroll.nativeElement.scrollTop = 0;
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
}
