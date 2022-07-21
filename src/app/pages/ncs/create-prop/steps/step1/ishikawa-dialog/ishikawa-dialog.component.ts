import { Component, OnInit } from "@angular/core";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProposalService } from "../../../proposal.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-ishikawa-dialog",
  templateUrl: "./ishikawa-dialog.component.html",
  styleUrls: ["./ishikawa-dialog.component.css"],
})
export class IshikawaDialogComponent implements OnInit {
  stepPosition: number = 1;

  machines: any[];
  equipaments: any[];
  instructions: any[];
  procedures: any[];
  nbrs: any[];
  regulatoryNorms: any[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public propService: ProposalService,
    public translate: TranslateService
  ) {}

  ngOnDestroy(): void {
    this.propService.popular();
  }

  ngOnInit(): void {
    this.propService.load();
    this.stepPosition = this.config.data.page;
  }

  returnTextButton(): string {
    if (this.isLastStep()) return this.translate.instant("global.close");

    return this.translate.instant("global.next");
  }

  search(event: any, type: string) {
    var filtro = event.query.normalize("NFKD").replace(/[^\w]/g, "");

    switch (type) {
      case "machine":
        this.machines = [];
        this.propService.machines.forEach((element) => {
          if (
            element.name
              .normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase())
          ) {
            this.machines.push(element);
          }
        });
        break;
      case "equipament":
        this.equipaments = [];
        this.propService.equipaments.forEach((element) => {
          if (
            element.name
              .normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase())
          ) {
            this.equipaments.push(element);
          }
        });
        break;
      case "instruction":
        this.instructions = [];
        this.propService.instructions.forEach((element) => {
          if (
            element.description
              .normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase())
          ) {
            this.instructions.push(element);
          }
        });
        break;

      case "procedure":
        this.procedures = [];
        this.propService.procedures.forEach((element) => {
          if (
            element.description
              ?.normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase()) ||
            element.code
              ?.normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase())
          ) {
            this.procedures.push(element);
          }
        });
        break;

      case "nbr":
        this.nbrs = [];
        this.propService.nbrs.forEach((element) => {
          if (
            element.description
              .normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase()) ||
            element.code
              .normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase())
          ) {
            this.nbrs.push(element);
          }
        });
        break;

      case "regulatory":
        this.regulatoryNorms = [];
        this.propService.regulatorys.forEach((element) => {
          if (
            element.description
              .normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase()) ||
            element.code
              .normalize("NFKD")
              .replace(/[^\w]/g, "")
              .toLowerCase()
              .includes(filtro.toLowerCase())
          ) {
            this.regulatoryNorms.push(element);
          }
        });
        break;
    }
  }

  isFirstStep() {
    return this.stepPosition === 1;
  }

  isLastStep() {
    return this.stepPosition === 7;
  }

  nextStep() {
    if (this.stepPosition >= 7) this.ref.close();
    this.stepPosition++;
    this.isLastStep();
  }

  backStep() {
    if (this.stepPosition <= 1) return;
    this.stepPosition--;
    this.isFirstStep();
  }

  close() {
    this.ref.close();
  }
}
