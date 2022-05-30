import { Component, Input, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"],
})
export class ProductInfoComponent implements OnInit {
  constructor(public nonComplianceService: NonComplianceService) {}

  hasProduct(): boolean {
    if (this.nonComplianceService.nc.product != null) return true;

    return false;
  }

  ngOnInit(): void {
  }
}
