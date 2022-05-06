import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css']
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
  actions: any[] = [];
  name: string;

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
    this.actions.push(action)
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
        this.actions =
            this.actions.filter(
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
}