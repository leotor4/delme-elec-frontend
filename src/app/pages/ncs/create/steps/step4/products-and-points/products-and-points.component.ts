import { Component, OnInit } from "@angular/core";
import { NonComplianceService } from "../../../../../../_services/non-compliance.service";
import {Attachment} from "../../../../../../models/attachment";

@Component({
  selector: "app-products-and-points",
  templateUrl: "./products-and-points.component.html",
  styleUrls: ["./products-and-points.component.css"],
})
export class ProductsAndPointsComponent implements OnInit {
  percent: number;

  constructor(public nonComplicanceService: NonComplianceService) {}

  ngOnInit(): void {
    this.percent = Math.round(
      (this.nonComplicanceService.nc.quant_nc /
        this.nonComplicanceService.nc.quant_total) *
        100
    );
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
