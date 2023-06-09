import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProposalService} from "../../proposal.service";
import {Contact} from "../../../../../models/contact.model";

@Component({
  selector: "app-review-infomations",
  templateUrl: "./review-infomations.component.html",
  styleUrls: ["./review-infomations.component.css"],
})
export class ReviewInfomationsComponent implements OnInit {
  isAllOpen = true;
  unselectedClass = "btn unselected-btn";
  selectedClass = "btn selected-btn";
  editorStyle = {
    height: "120px",
    width: "260px",
    border: "2px solid #333333",
    "border-radius": "5px",
  };
  @Output() changeStepPosition: EventEmitter<number> = new EventEmitter();
  constructor(public propService: ProposalService) {}

  goToStepById(position: number) {
    this.changeStepPosition.emit(position);
  }
  ngOnInit(): void {}

  dataParse(date: any) {
    let newDate = new Date(date);
    let formatedDate = newDate.toLocaleString("pt-Br").split(" ")[0];
    return formatedDate;
  }
  returnString(obj: any) {
    let str = "";
    if (obj?.name) return obj.name + " ";
    if (obj?.code) str += obj.code + " ";
    if (obj?.description) str += obj.description + " ";
    if (obj?.rev) str += obj.rev + " ";
    return str;
  }
}
