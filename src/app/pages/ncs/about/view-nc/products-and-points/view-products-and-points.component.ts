import {Component, OnInit} from '@angular/core';
import { Attachment } from 'src/app/models/attachment';
import {AboutService} from "../../about.service";

@Component({
  selector: "app-view-products-and-points",
  templateUrl: "./view-products-and-points.component.html",
  styleUrls: ["./view-products-and-points.component.css"],
})
export class ViewProductsAndPointsComponent implements OnInit {
  constructor(public aboutSrvc: AboutService) {}

  ngOnInit(): void {}

  getPercent() {
    return Math.round(
      (this.aboutSrvc.nc?.quant_nc * 100) / this.aboutSrvc.nc?.quant_total
    );
  }
  returnFile(name: string) {
    let acoesFile: Attachment[] = [];
    this.aboutSrvc.nc.attachments.forEach((element) => {
      if (element.path == name) {
        acoesFile.push(element);
      }
    });
    return acoesFile;
  }

  returnNumber(): string {
    let text = "";
    let nc = this.aboutSrvc.nc;

    if (nc.tipo_controle!.includes("OP")) {
      text = nc.num_op!;
    } else {
      text = nc.num_nota!;
    }

    return text;
  }
}
