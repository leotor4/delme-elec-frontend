import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ProposalService} from "../../../proposal.service";

@Component({
  selector: 'app-action-plan-dialog',
  templateUrl: './action-plan-dialog.component.html',
  styleUrls: ['./action-plan-dialog.component.css']
})
export class ActionPlanDialogComponent implements OnInit {
  action: any
  date: string;
 
  selectedResp: string;
  statuses: string[] = ["Pendente", "Atrasada", "Cancelado", "Concluido"];
  selectedStatus: string;
  name: string;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,public propService:ProposalService) {
    this.action = this.config.data
    this.date= this.action.deadline
  
  }

  ngOnInit(): void {
    console.log(this.action.responsible)
  }
  close(){
    this.ref.close()
  }

  save() {
    this.ref.close(this.action)
  }
}
