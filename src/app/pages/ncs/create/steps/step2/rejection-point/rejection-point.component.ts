import { Component, Input, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-rejection-point",
  templateUrl: "./rejection-point.component.html",
  styleUrls: ["./rejection-point.component.css"],
})
export class RejectionPointComponent implements OnInit {
  @Input("hasProduct") test: boolean;
  constructor(public nonComplianceService: NonComplianceService) {}

  ngOnInit(): void {}
}
