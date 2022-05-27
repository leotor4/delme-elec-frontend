import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MenuItem, MessageService} from "primeng/api";
import { NonCompliance } from 'src/app/models/non-compliance';
import { ProposalSolution } from 'src/app/models/proposal-solution';
import {NonComplianceService} from "../../../../_services/non-compliance.service";
import { ProposalService } from '../proposal.service';

@Component({
  selector: 'app-create-prop-stepper',
  templateUrl: './create-prop-stepper.component.html',
  styleUrls: ['./create-prop-stepper.component.css']
})
export class CreatePropStepperComponent implements OnInit {
  items: MenuItem[];
  stepPosition: number = 3;
  lastStepLabel = "Avançar";
  constructor(private route: ActivatedRoute,private ncService:NonComplianceService,private messageService: MessageService,public propService:ProposalService) {}

  disableButton(): boolean {
    switch (this.stepPosition) {
      case 0:
        return false;
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
     let id = parseInt(this.route.snapshot.paramMap.get('id')||"")

    
    this.propService.popular()
    this.propService.put().subscribe({
       next:(data:any )=> {
        this.messageService.add({
          key: "create-prop-key",
          severity: "success",
          summary: "Passo " + this.stepPosition + " salvo com sucesso.",
          life: 3000,
        });
        this.stepPosition++;
      },
      error:err =>{
        this.messageService.add({
          key: "create-prop-key",
          severity: "error",
          summary: "Houve um erro ao salvar passo " + this.stepPosition + "." ,
          life: 3000,
        });
      }
    })
    
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
