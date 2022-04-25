import { Component, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-ncs-create-header",
  templateUrl: "./ncs-create-header.component.html",
  styleUrls: ["./ncs-create-header.component.css"],
})
export class NcsCreateHeaderComponent implements OnInit {
  constructor(public nonComplianceService: NonComplianceService) {}

  ngOnInit(): void {}

  teste() {
    this.nonComplianceService.post();
  }
}
