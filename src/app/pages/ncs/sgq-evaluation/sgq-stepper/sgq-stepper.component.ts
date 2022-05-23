import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {NonComplianceService} from "../../../../_services/non-compliance.service";

@Component({
  selector: 'app-sgq-stepper',
  templateUrl: './sgq-stepper.component.html',
  styleUrls: ['./sgq-stepper.component.css']
})
export class SgqStepperComponent implements OnInit {

  items: MenuItem[];
  stepPosition: number = 5;
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
      { label: "Reincidência" },
      { label: "Evidências" },
      { label: "Riscos e Oportunidades" },
      { label: "Mudanças" },
      { label: "Emitir Notificações" },
      { label: "Revisar Informações" }
    ];
  }
  getNextPageBtnLabel() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let labelName = isLastStep ? "Submeter Avaliação" : "Avançar";
    return labelName;
  }
  getNextPageBtnIcon() {
    let isLastStep = this.stepPosition === this.items.length - 1;
    let iconClass = isLastStep ? "bi bi-file-earmark-medical" : "pi pi-arrow-right";
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
