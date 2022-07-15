import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {ActionPlanDialogComponent} from "./action-plan-dialog/action-plan-dialog.component";
import {ProposalService} from "../../proposal.service";
import {User} from 'src/app/models/user.model';
import {ActionPlan} from 'src/app/models/action-plan';
import {ActionPlanService} from 'src/app/_services/action-plan.service';
import {ContactsService} from "../../../create/steps/step3/contacts.service";
import {Contact} from "../../../../../models/contact.model";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-action-plan',
  templateUrl: './action-plan.component.html',
  styleUrls: ['./action-plan.component.css'],
  providers: [DialogService]
})
export class ActionPlanComponent implements OnInit {

 
  
  date: string;
  selectedResp: User;
  statuses: string[] = [this.translate.instant("createProp.step2.status1"), this.translate.instant("createProp.step2.status2"), this.translate.instant("createProp.step2.status3"), this.translate.instant("createProp.step2.status4")];
  selectedStatus: string;
  name: string;
  contacts: Contact[]

  constructor(private actionService:ActionPlanService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              public dialogService: DialogService,
              public propService: ProposalService,
              private contactsSrvc: ContactsService,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.getAllContacts()

  }

  getAllContacts() {
    this.contactsSrvc.get().subscribe((data: any) => {
       this.contacts = data.contact
    })
  }

  addAction() {
    let actionPlan = new ActionPlan()
    actionPlan.description = this.name
    actionPlan.responsible = this.selectedResp
    actionPlan.status = this.selectedStatus
    actionPlan.term = this.date
    if(!this.propService.propSolution.contacts.some(e => e.email === this.selectedResp.email)){
      this.propService.propSolution.contacts.push(this.selectedResp)
      this.propService.contacts.push(this.selectedResp)
    }
    this.propService.propSolution.actionPlans.push(actionPlan)
    this.name = ""
    this.selectedStatus = ""
    this.date = ""
  }
  dataParse(date: any) {
    let newDate = new Date(date);
    return newDate.toLocaleString("pt-Br").split(" ")[0];
  }


  deleteAction(action:ActionPlan){
    let afectedsector = this.propService.sectors.find(i => i.name === this.propService.ncProp.tipos_local_item)
    this.confirmationService.confirm({
      message:
          this.translate.instant("createProp.step2.delActionMsg")  + ' '  +
          action.description+
          this.translate.instant('global.contacts.message2'),
      header: this.translate.instant("createProp.step2.delActionTitle") ,
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.propService.propSolution.actionPlans =
            this.propService.propSolution.actionPlans.filter(
                (val) => val.description !== action.description 
            );
        if(action.responsible?.email!= this.propService.ncProp.emissor?.email && action.responsible?.email!="efraim@electrosonteleco.com" && action.responsible?.email!="manuela.starowsta@electrosonteleco.com.br" && action.responsible?.email!=this.propService.ncProp.partner?.email&& action.responsible?.email!=afectedsector?.responsible_email){
          this.propService.propSolution.contacts =
              this.propService.propSolution.contacts.filter(
                  (val) => val.email !== action.responsible?.email
              );
          this.propService.ncProp.contacts =
              this.propService.ncProp.contacts.filter(
                  (val) => val.email !== action.responsible?.email
              );
          this.propService.contacts =
              this.propService.contacts.filter(
                  (val) => val.email !== action.responsible?.email
              );
        }
        this.messageService.add({
          severity: "info",
          summary: this.translate.instant("createProp.step2.successDel") ,
          life: 3000,
        });
      },
    });
  }

  editAction(action: any){
    const ref = this.dialogService.open(ActionPlanDialogComponent, {
      data: {...action},
      header: this.translate.instant("createProp.step2.EditAction") ,
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
