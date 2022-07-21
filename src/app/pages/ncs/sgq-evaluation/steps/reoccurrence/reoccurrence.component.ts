import { Component, OnInit } from "@angular/core";
import { SgqService } from "../../sgq.service";
import { DialogService } from "primeng/dynamicdialog";
import { AddNcDialogComponent } from "./add-nc-dialog/add-nc-dialog.component";
import { ConfirmationService, MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import {DadosNCComponent} from "../../../../dialogs/dados-nc/dados-nc.component";

@Component({
  selector: "app-reoccurrence",
  templateUrl: "./reoccurrence.component.html",
  styleUrls: ["./reoccurrence.component.css"],
  providers: [DialogService, ConfirmationService],
})
export class ReoccurrenceComponent implements OnInit {
  constructor(
    public dialogService: DialogService,
    public sgqServ: SgqService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.sgqServ.getAllNC();
  }

  delete(nc: any) {
    this.confirmationService.confirm({
      message: this.translate.instant("global.actionCantBeReversed"),
      header: this.translate.instant("global.areYouSureReocurrence"),
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.sgqServ.sgq.recurrence = this.sgqServ.sgq.recurrence?.filter(
          (val) => val.id !== nc.id
        );
        this.messageService.add({
          severity: "success",
          summary: this.translate.instant("sgq.steps.step1.successDel"),
          life: 3000,
        });
      },
    });
  }

  parseDate(date: string) {
    let d = new Date(Date.parse(date));
    return d.toLocaleDateString();
  }

  openDialog() {
    const ref = this.dialogService.open(AddNcDialogComponent, {
      data: { nc: this.sgqServ.nc.code, selected: this.sgqServ.sgq.recurrence },
      showHeader: false,
      width: "60vw",
    });
    ref.onClose.subscribe((answer: any[]) => {
      this.sgqServ.sgq.recurrence = answer;
    });
  }

  details(nc: any) {
    const ref = this.dialogService.open(DadosNCComponent, {
      data: { nc: nc },
      showHeader: false,
      width: "60vw",
    });
    ref.onClose.subscribe((answer: any[]) => {
      if (answer) {
        this.delete(nc);
      }
    });
  }
}
