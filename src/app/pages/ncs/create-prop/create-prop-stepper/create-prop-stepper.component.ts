import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {NonComplianceService} from "../../../../_services/non-compliance.service";

@Component({
  selector: 'app-create-prop-stepper',
  templateUrl: './create-prop-stepper.component.html',
  styleUrls: ['./create-prop-stepper.component.css']
})
export class CreatePropStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 2;
  lastStepLabel = "Avançar";
  constructor(public nonComplianceService: NonComplianceService) {}

  disableButton(): boolean {
    switch (this.stepPosition) {
      case 0:
        return false;
        // return this.nonComplianceService.avancarPasso1();
      case 1:
        //return this.nonComplianceService.avancarPasso2();
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
      { label: "Diagrama de Ishikawa" },
      { label: "5 Porquês" },
      { label: "Plano de Ações" },
      { label: "Emitir Notificações" },
      { label: "Revisar Informações" },
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let labelName = isLastStep ? "Submeter Análise" : "Avançar";
    return labelName;
  }
  getNextPageBtnIcon() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let iconClass = isLastStep ? "bi bi-file-earmark-plus" : "pi pi-arrow-right";
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
