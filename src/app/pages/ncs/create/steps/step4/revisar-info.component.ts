import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Attachment } from "src/app/models/attachment";
import { NonComplianceService } from "../../../../../_services/non-compliance.service";
@Component({
  selector: "app-step4",
  templateUrl: "./revisar-info.component.html",
  styleUrls: ["./revisar-info.component.css"],
})
export class RevisarInfoComponent implements OnInit {
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  @Output() changeStepPosition: EventEmitter<number> = new EventEmitter();
  constructor(public nonComplicanceService: NonComplianceService) {}

  goToStepById(position: number) {
    this.changeStepPosition.emit(position);
  }
  ngOnInit(): void {
   
  }

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
