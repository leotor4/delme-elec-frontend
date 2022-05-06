import { Component, OnInit } from "@angular/core";
import { NonComplianceService } from "../../../../../../_services/non-compliance.service";

@Component({
  selector: "app-products-and-points",
  templateUrl: "./products-and-points.component.html",
  styleUrls: ["./products-and-points.component.css"],
})
export class ProductsAndPointsComponent implements OnInit {
  percent: number;

  constructor(public nonComplicanceService: NonComplianceService) {}

  ngOnInit(): void {
    this.percent = Math.floor(
      (this.nonComplicanceService.nc.quant_nc /
        this.nonComplicanceService.nc.quant_total) *
        100
    );
  }
}
