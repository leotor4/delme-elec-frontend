import { Component, Input, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-checkpoint",
  templateUrl: "./checkpoint.component.html",
  styleUrls: ["./checkpoint.component.css"],
})
export class CheckpointComponent implements OnInit {
  selectedCity: any;
  fileName: string[] = [];
  fileNameAcoes: ["marcelo"];

  tipoControle = "";

  @Input("hasProduct") test: boolean;
  constructor(public nonComplicanceService: NonComplianceService) {}

  controleOptions = [
    "OP-PROD",
    "OP-SA",
    "OP-I",
    "NF-e",
    "PC",
    "PV",
    "CC",
    "PR",
  ];

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
