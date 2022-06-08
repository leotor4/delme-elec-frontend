import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ActionPlanDialogComponent} from "./action-plan-dialog/action-plan-dialog.component";
import {ProposalService} from "../../proposal.service";
import { User } from 'src/app/models/user.model';
import { ActionPlan } from 'src/app/models/action-plan';
import { ActionPlanService } from 'src/app/_services/action-plan.service';


@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css'],
  providers: [DialogService]
})
export class ActionPlanComponent implements OnInit {

 
  
  date: string;
  selectedResp: User;
  statuses: string[] = ["A Fazer", "Fazendo", "Concluido", "Cancelado", "Atrasado", "Postergado"];
  selectedStatus: string;
  name: string;

  constructor(private actionService:ActionPlanService,private confirmationService: ConfirmationService, private messageService: MessageService, public dialogService: DialogService, public propService: ProposalService) { }

  ngOnInit(): void {
    
  }

  addAction() {
    let actionPlan = new ActionPlan()
    actionPlan.description = this.name
    actionPlan.responsible = this.selectedResp
    actionPlan.status = this.selectedStatus
    actionPlan.term = this.date
    this.propService.propSolution.actionPlans.push(actionPlan)

    this.name = ""
    this.selectedStatus = ""
    this.date = ""
  }


  deleteAction(action:ActionPlan){
    this.confirmationService.confirm({
      message:
          "Você tem certeza que quer excluir a ação " +
          action.description+
          " da lista?",
      header: "Excluir Ação",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.propService.propSolution.actionPlans =
            this.propService.propSolution.actionPlans.filter(
                (val) => val.description !== action.description 
            );
        this.messageService.add({
          severity: "info",
          summary: "Ação removida com sucesso",
          life: 3000,
        });
      },
    });
  }

  editAction(action: any){
    const ref = this.dialogService.open(ActionPlanDialogComponent, {
      data: {...action},
      header: 'Editar ação',
      width: '30%',
      height: '50%'
    });

    ref.onClose.subscribe((action: ActionPlan) => {
      if (action) {
        let index = this.propService.propSolution.actionPlans.findIndex((item) => {
          return item.description == action.description;
        });
        this.propService.propSolution.actionPlans[index] = action;
      }
    });
  }
}
