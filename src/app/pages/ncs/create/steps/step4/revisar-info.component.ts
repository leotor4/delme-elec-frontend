import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-step4",
  templateUrl: "./revisar-info.component.html",
  styleUrls: ["./revisar-info.component.css"],
})
export class RevisarInfoComponent implements OnInit {
  ncID = 202227353;
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  @Output() changeStepPosition: EventEmitter<number> = new EventEmitter();
  constructor() {}

  goToStepById(position: number) {
    this.changeStepPosition.emit(position);
  }
  ngOnInit(): void {}
}