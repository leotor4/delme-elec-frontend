import { Component, OnInit } from "@angular/core";
import { UpdateDate } from "src/app/models/update-date";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { UpdateDateService } from "src/app/_services/update-date.service";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"],
})
export class Step2Component implements OnInit {
  hasSelectedProduct: boolean;
  childDataReceived: string = "";
  constructor(public nonComplianceService: NonComplianceService) {
    this.hasSelectedProduct = false;
  }

  ngOnInit(): void {}

  getHasSelectedProduct(event: boolean) {
    this.hasSelectedProduct = event;
  }

  hasProduct(): boolean {
    if (this.nonComplianceService.nc.product != null) return true;

    return false;
  }
}
