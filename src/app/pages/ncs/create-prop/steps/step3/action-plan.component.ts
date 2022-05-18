import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ActionPlanDialogComponent} from "./action-plan-dialog/action-plan-dialog.component";
import {ProposalService} from "../../proposal.service";

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css'],
  providers: [DialogService, MessageService]
})
export class ActionPlanComponent implements OnInit {

  responsible: string[] = [
    "Elvira Jehu",
    "Aigneis Camden",
    "Mildrid Infield",
    "Atlanta Hanleigh",
    "Elie Dalli",
    "Tilly Honoria",
    "Arabel Smitt",
    "Carolina Tound",
    "Brana Yerkovich",
    "Nerta Pitt"
  ];
  id = 0;
  date: string;
  selectedResp: string;
  statuses: string[] = ["Pendente", "Em andamento", "Finalizada"];
  selectedStatus: string;
  name: string;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, public dialogService: DialogService, public propService: ProposalService) { }

  ngOnInit(): void {
  }

  addAction() {
    let action = {
      id: this.id,
      name: this.name,
      responsible: this.selectedResp,
      deadline: this.date,
      status: this.selectedStatus
    }
    this.propService.actions.push(action)
    this.name = ""
    this.selectedResp = ""
    this.date = ""
    this.selectedStatus = ""
    this.id++
  }
  deleteAction(action:any){
    this.confirmationService.confirm({
      message:
          "Você tem certeza que quer excluir a ação " +
          action.name+
          " da lista?",
      header: "Excluir Ação",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.propService.actions =
            this.propService.actions.filter(
                (val) => val.id !== action.id
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

    ref.onClose.subscribe((action: any) => {
      if (action) {
        let index = this.propService.actions.findIndex((item) => {
          return item.id == action.id;
        });
        this.propService.actions[index] = action;
      }
    });
  }
}
