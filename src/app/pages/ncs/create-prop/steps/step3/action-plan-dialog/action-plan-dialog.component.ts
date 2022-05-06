import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-action-plan-dialog',
  templateUrl: './action-plan-dialog.component.html',
  styleUrls: ['./action-plan-dialog.component.css']
})
export class ActionPlanDialogComponent implements OnInit {
  action: any
  date: string;
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
  selectedResp: string;
  statuses: string[] = ["A Fazer", "Fazendo", "Concluido", "Cancelado", "Atrasado", "Postergado"];
  selectedStatus: string;
  name: string;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.action = this.config.data
    this.date= this.action.deadline
  }

  ngOnInit(): void {
  }
  close(){
    this.ref.close()
  }

  save() {
    this.ref.close(this.action)
  }
}
