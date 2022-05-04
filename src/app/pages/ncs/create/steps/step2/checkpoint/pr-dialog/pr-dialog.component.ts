import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Procedure } from "src/app/models/procedure";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { ProcedureService } from "src/app/_services/procedure.service";

@Component({
  selector: "app-pr-dialog",
  templateUrl: "./pr-dialog.component.html",
  styleUrls: ["./pr-dialog.component.css"],
})
export class PrDialogComponent implements OnInit {
  code = "";
  description = "";
  rev = "";
  file: any;
  constructor(
    public ref: DynamicDialogRef,
    public procedureService: ProcedureService,
    private nonComplianceService: NonComplianceService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onchange(event: any) {
    this.file = event.target.files[0];

    console.log(this.file);
  }
  save() {
    let procedure = new Procedure();
    procedure.code = this.code;
    procedure.description = this.description;
    procedure.rev = this.rev;

    this.procedureService.post(procedure, this.file).subscribe(
      (data) => {
        this.sucess();
        this.procedureService.get().subscribe((data: any) => {
          this.nonComplianceService.procedures = data.procedures;
        });
      },
      (err) => {
        this.fail();
      }
    );
  }
  close() {
    this.ref.close();
  }

  sucess() {
    this.messageService.add({
      key: "myKey1",
      severity: "success",
      summary: "procedimento salva com sucesso",
      life: 3000,
    });
    this.ref.close();
  }

  fail() {
    this.messageService.add({
      key: "myKey1",
      severity: "error",
      summary: "Houve um problema ao salvar procedimento.",
      life: 3000,
    });
    this.ref.close();
  }
}
