import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-ncs-create-stepper",
  templateUrl: "./ncs-create-stepper.component.html",
  styleUrls: ["./ncs-create-stepper.component.css"],
})
export class NcsCreateStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 1;
  lastStepLabel = "Avançar";
  constructor() {}

  ngOnInit() {
    this.items = [
      { label: "Identificar Não Conformidade" },
      { label: "Produtos e Pontos" },
      { label: "Partes Interessadas" },
      { label: "Revisar Informações" },
    ];
  }

  nextStep() {
    if (this.stepPosition >= this.items.length - 1) return;
    this.stepPosition++;
  }
  backStep() {
    if (this.stepPosition <= 0) return;
    this.stepPosition--;
  }
}
