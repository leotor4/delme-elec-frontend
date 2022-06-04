import { Component, OnInit } from '@angular/core';
import {SgqService} from "../../sgq.service";
import {DialogService} from "primeng/dynamicdialog";
import {AddNcDialogComponent} from "./add-nc-dialog/add-nc-dialog.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {NcInfoComponent} from "./nc-info/nc-info.component";
import {NonCompliance} from "../../../../../models/non-compliance";

@Component({
  selector: 'app-reoccurrence',
  templateUrl: './reoccurrence.component.html',
  styleUrls: ['./reoccurrence.component.css'],
  providers: [DialogService, ConfirmationService]
})
export class ReoccurrenceComponent implements OnInit {

  constructor(public dialogService: DialogService,
              public sgqServ: SgqService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.sgqServ.getAllNC()
  }

  delete(nc: any) {
    this.confirmationService.confirm({
      message:
          "Esta ação não poderá ser revertida!",
      header: "Você tem certeza que quer desfazer a reincidência?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.sgqServ.sgq.recurrence =
            this.sgqServ.sgq.recurrence?.filter(
                (val) => val.id !== nc.id
            );
        this.messageService.add({
          severity: "info",
          summary: "Contato Removido com sucesso",
          life: 3000,
        });
      },
    });
  }

  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }

  openDialog() {
    const ref = this.dialogService.open(AddNcDialogComponent, {
      data: {nc: "xxx.2022",
        selected: this.sgqServ.sgq.recurrence
      },
      showHeader: false,
      width: '60vw',
    });
    ref.onClose.subscribe((answer: any[])=>{
      this.sgqServ.sgq.recurrence = answer
    })
  }

  details(nc: any) {
    const ref = this.dialogService.open(NcInfoComponent, {
      data: {nc: nc,
      },
      showHeader: false,
      width: '60vw',
    });
    ref.onClose.subscribe((answer: any[])=>{
      if(answer){
        this.delete(nc)
      }
    })
  }
}
