import { Component, OnInit } from "@angular/core";
import { DialogService } from "primeng/dynamicdialog";
import { Attachment } from "src/app/models/attachment";
import {NonComplianceService} from "src/app/_services/non-compliance.service";
import { PrDialogComponent } from "../pr-dialog/pr-dialog.component";
import {TranslateService} from "@ngx-translate/core";
import {environment} from "../../../../../../../../environments/environment";
import {UpdateDateService} from "../../../../../../../_services/update-date.service";
import {UpdateDate} from "../../../../../../../models/update-date";

@Component({
  selector: "app-checkpoint-items",
  templateUrl: "./checkpoint-items.component.html",
  styleUrls: ["./checkpoint-items.component.css"],
  providers: [DialogService],
})
export class CheckpointItemsComponent implements OnInit {
  constructor(
    public nonComplicanceService: NonComplianceService,
    public dialogService: DialogService,
    public translate: TranslateService,
    public updateService: UpdateDateService
  ) {}

  ngOnInit(): void {
    this.updateService.get().subscribe((data: any) => {
      this.updates = data.Updatedate[0];
    });
  }

  results: any;
  resultsPr: any[];
  updates: UpdateDate;

  search(event: any) {
    let filtro = event.query;
    this.results = [];
    this.nonComplicanceService.procedures.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        this.results.push(element);
      }
    });

   
  }

  verificarExistencia(element: any, filtro: string): boolean {
    return element.code.toUpperCase().includes(filtro.toUpperCase()) ||
        element.rev.toUpperCase().includes(filtro.toUpperCase()) ||
        element.description.toUpperCase().includes(filtro.toUpperCase());

  }

  returnOpScreen() {
    return this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type1") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type2") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type3");
  }

  returnNfScreen() {
    return this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type4") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type5") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type6") ||
        this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type7");
  }

  returnPrScreen() {
    return this.nonComplicanceService.nc.tipo_controle == this.translate.instant("newNC.step1.checkpoint.type8");
  }

  onUpload(event: any, name: string) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.nonComplicanceService.fileControle = files;
      for (var i = 0; i < files.length; i++) {
        let att = new Attachment();
        att.name = files[i].name;
        att.type = files[i].name.split(".")[1];
        att.path = name;
        this.nonComplicanceService.nc.attachments.push(att);
      }
    }
  }

  clearFileName(name: string) {
    for (let i = 0; i < this.nonComplicanceService.nc.attachments.length; i++) {
      if (this.nonComplicanceService.nc.attachments[i].path == name) {
        this.nonComplicanceService.nc.attachments.splice(i);
      }
    }

    this.nonComplicanceService.fileControle = [];
  }

  returnFiles(name: string): Attachment[] {
    let evidencias: Attachment[] = [];
    this.nonComplicanceService.nc.attachments.forEach((element) => {
      if (element.path == name) {
        evidencias.push(element);
      }
    });

    return evidencias;
  }

  openDialog() {
    const ref = this.dialogService.open(PrDialogComponent, {
      header: this.translate.instant("newNC.step1.checkpoint.createIT"),
      width: "425px",
    });
  }

  onSelected() {
    this.nonComplicanceService.nc.procedure =
      this.nonComplicanceService.autoCompletePrValue;
  }

  searchPr(event: any) {
    let filtro = event.query;
    this.resultsPr = [];
    this.nonComplicanceService.procedures.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        this.resultsPr.push(element);
      }
    });
  }
  onSelectedPr() {
    this.nonComplicanceService.nc.procedure =
        this.nonComplicanceService.autoCompletePrValue;
  }
  onChange() {
    if (!this.nonComplicanceService.autoCompleteItValue) {
      this.nonComplicanceService.nc.instruction = undefined;
    }

    if (!this.nonComplicanceService.autoCompletePrValue) {
      this.nonComplicanceService.nc.procedure = undefined;
    }
  }
  returnUpdateTime() {
    if (this.updates) {
      let dateAtt = new Date(this.updates.update_time);
      let dateNow = new Date();
      var Difference_In_Time = dateNow.getTime() - dateAtt.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      var round_day = Math.floor(Difference_In_Days);
      if (round_day < 1) {
        return this.translate.instant("newNC.step1.today");
      } else {
        return this.translate.instant("newNC.step1.ago") + round_day + this.translate.instant("newNC.step1.days");
      }
    }
    return "";
  }
}

