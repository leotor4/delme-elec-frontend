import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Instruction } from "src/app/models/instruction";
import { InstructionsService } from "src/app/_services/instructions.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-it-dialog",
  templateUrl: "./it-dialog.component.html",
  styleUrls: ["./it-dialog.component.css"],
})
export class ItDialogComponent implements OnInit {
  code = "";
  description = "";
  rev = "";
  file: any;
  constructor(
    public ref: DynamicDialogRef,
    public instructionService: InstructionsService,
    private messageService: MessageService,
    private nonComplianceService: NonComplianceService
  ) {}

  ngOnInit(): void {}
  onchange(event: any) {
    this.file = event.target.files[0];

    console.log(this.file);
  }
  save() {
    let instrucao = new Instruction();
    instrucao.code = this.code;
    instrucao.description = this.description;
    instrucao.rev = this.rev;

    this.instructionService.post(instrucao, this.file).subscribe(
      (data) => {
        this.sucess();
        this.instructionService.get().subscribe((data: any) => {
          this.nonComplianceService.instructions = data.instructions;
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
      summary: "Instrução salva com sucesso",
      life: 3000,
    });
    this.ref.close();
  }

  fail() {
    this.messageService.add({
      key: "myKey1",
      severity: "error",
      summary: "Houve um problema ao salvar instrução.",
      life: 3000,
    });
    this.ref.close();
  }
}
