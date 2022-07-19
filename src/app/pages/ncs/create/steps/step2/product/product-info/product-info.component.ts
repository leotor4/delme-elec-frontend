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
    return this.nonComplianceService.nc.product != null;
  }

  ngOnInit(): void {}

  isNotApply() {
    return this.nonComplianceService.nc.product?.name=="Não se Aplica";
  }

  returnError(): string {
    let nc = this.nonComplianceService.nc;
    if (nc.quant_nc > nc.quant_total)
      return "Quantidade da NC maior que Quantidade Total *";

    return "";
  }
}
