import { Component, OnInit } from '@angular/core';
import {SgqService} from "../../sgq.service";
import {DialogService} from "primeng/dynamicdialog";
import {AddNcDialogComponent} from "./add-nc-dialog/add-nc-dialog.component";
import {ConfirmationService, MessageService} from "primeng/api";
import {NcInfoComponent} from "./nc-info/nc-info.component";

@Component({
  selector: 'app-reoccurrence',
  templateUrl: './reoccurrence.component.html',
  styleUrls: ['./reoccurrence.component.css'],
  providers: [DialogService, ConfirmationService,MessageService]
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
          "Você tem certeza que quer excluir o contato " +
          nc.code +
          " da lista?",
      header: "Excluir Contato",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.sgqServ.step1 =
            this.sgqServ.step1.filter(
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
        selected: this.sgqServ.step1
      },
      showHeader: false,
      width: '60vw',
    });
    ref.onClose.subscribe((answer: any[])=>{
      this.sgqServ.step1 = answer
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
    })
  }
}
