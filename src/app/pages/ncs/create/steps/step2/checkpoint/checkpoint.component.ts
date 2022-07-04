import { Component, Input, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-checkpoint",
  templateUrl: "./checkpoint.component.html",
  styleUrls: ["./checkpoint.component.css"],
})
export class CheckpointComponent implements OnInit {
  selectedCity: any;
  fileName: string[] = [];

  @Input("hasProduct") test: boolean;
  constructor(public nonComplicanceService: NonComplianceService,
              public translate: TranslateService) {}

  controleOptions = [
    this.translate.instant("newNC.step1.checkpoint.type1"),
    this.translate.instant("newNC.step1.checkpoint.type2"),
    this.translate.instant("newNC.step1.checkpoint.type3"),
    this.translate.instant("newNC.step1.checkpoint.type4"),
    this.translate.instant("newNC.step1.checkpoint.type5"),
    this.translate.instant("newNC.step1.checkpoint.type6"),
    this.translate.instant("newNC.step1.checkpoint.type7"),
    this.translate.instant("newNC.step1.checkpoint.type8"),
  ];

  limparCampos(){
    this.nonComplicanceService.nc.text_area_reject_point = ""
    this.nonComplicanceService.nc.num_op = ""
    this.nonComplicanceService.nc.num_lote = ""
    this.nonComplicanceService.nc.num_nota = ""
    this.nonComplicanceService.nc.instruction = undefined
    this.nonComplicanceService.nc.procedure = undefined
    this.nonComplicanceService.autoCompleteItValue = undefined
    this.nonComplicanceService.autoCompletePrValue = undefined
  }

  ngOnInit(): void {}

  clearFile() {
    this.fileName = [];
    this.nonComplicanceService.fileProduct = [];
  }

  onUpload(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      let files = target.files;
      this.nonComplicanceService.fileProduct = files;
      for (let i = 0; i < files.length; i++) {
        this.fileName.push(files[i].name);
      }
    }
  }
}
