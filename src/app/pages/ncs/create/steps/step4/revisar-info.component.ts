import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {NonComplianceService} from "../../../../../_services/non-compliance.service";

@Component({
  selector: "app-step4",
  templateUrl: "./revisar-info.component.html",
  styleUrls: ["./revisar-info.component.css"],
})
export class RevisarInfoComponent implements OnInit {
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
}
