import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import {NonCompliance} from "../../../../models/non-compliance";

@Component({
  selector: "app-ncs-create-stepper",
  templateUrl: "./ncs-create-stepper.component.html",
  styleUrls: ["./ncs-create-stepper.component.css"],
})
export class NcsCreateStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 0;
  lastStepLabel = "Avançar";
  constructor(private route:Router,public nonComplianceService: NonComplianceService,private messageService: MessageService,) {}

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
    return this.stepPosition === this.items.length-1 ? true : false;
  }
  
  nextStep() {
    if (this.isLastStep()) this.nonComplianceService.nc.status = "running"
      this.nonComplianceService.put().subscribe({
        next: data => {
          this.messageService.add({
            key: "myKey1",
            severity: "success",
            summary: this.isLastStep()?"Não conformidade concluida com sucesso.":"Passo " + (this.stepPosition + 1) + " salvo com sucesso." ,
            life: 3000,
          });

          if(this.isLastStep()) this.nonComplianceService.nc= new NonCompliance()
          if (!this.isLastStep()) this.stepPosition++
        },
        error: err => {
          this.messageService.add({
            key: "myKey1",
            severity: "error",
            summary: "Houve um problema ao salvar dados do passo " + this.stepPosition + ".",
            life: 3000,
          });
          console.log(err)
        }
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
    if (this.isLastStep()){
      return "/ncs"
    } else return
  }
}
