import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ProposalService} from "../../../proposal.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-action-plan-dialog',
  templateUrl: './action-plan-dialog.component.html',
  styleUrls: ['./action-plan-dialog.component.css']
})
export class ActionPlanDialogComponent implements OnInit {
  action: any
  date: string;
 
  selectedResp: string;
  statuses: string[] = [this.translate.instant("createProp.step2.status1"), this.translate.instant("createProp.step2.status2"), this.translate.instant("createProp.step2.status3"), this.translate.instant("createProp.step2.status4")];
  selectedStatus: string;
  name: string;
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public propService:ProposalService,
              public translate: TranslateService) {
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
