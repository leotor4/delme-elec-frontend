import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Attachment } from 'src/app/models/attachment';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';

@Component({
  selector: "app-gerar-pdf",
  templateUrl: "./gerar-pdf.component.html",
  styleUrls: ["./gerar-pdf.component.css"],
})
export class GerarPdfComponent implements OnInit {
  ncID = "001/2022";
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  @Output() changeStepPosition: EventEmitter<number> = new EventEmitter();
  constructor(public nonComplicanceService: NonComplianceService) {}

  goToStepById(position: number) {
    this.changeStepPosition.emit(position);
  }
  ngOnInit(): void {}

  emissor = "";

  returnTitle(): string {
    if (this.nonComplicanceService.nc.tipos_parceiro_item == "Interno")
      return "Dados do Setor";
    return "Razão Social";
  }

  returnFile(name: string) {
    let acoesFile: Attachment[] = [];
    this.nonComplicanceService.nc.attachments.forEach((element) => {
      if (element.path == name) {
        acoesFile.push(element);
      }
    });
    return acoesFile;
  }
}
