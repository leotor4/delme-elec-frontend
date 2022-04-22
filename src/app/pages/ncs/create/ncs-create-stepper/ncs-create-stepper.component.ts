import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-ncs-create-stepper",
  templateUrl: "./ncs-create-stepper.component.html",
  styleUrls: ["./ncs-create-stepper.component.css"],
})
export class NcsCreateStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 3;
  lastStepLabel = "Avançar";
  constructor(public nonComplianceService: NonComplianceService) {}

  disableButton(): boolean {
    switch (this.stepPosition) {
      case 0:
        return false;
      // return this.nonComplianceService.avancarPasso1();
      case 1:
        return false;
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
      { label: "Identificar Não Conformidade" },
      { label: "Produtos e Pontos" },
      { label: "Partes Interessadas" },
      { label: "Revisar Informações" },
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let labelName = isLastStep ? "Criar nova NC" : "Avançar";
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
  nextStep() {
    if (this.stepPosition >= this.items.length - 1) return;
    this.stepPosition++;
  }
  backStep() {
    if (this.stepPosition <= 0) return;
    this.stepPosition--;
    this.isFirstStep();
  }
  changeStepByPosition(event: any) {
    this.stepPosition = event;
  }
}
