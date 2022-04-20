import { Component, OnInit } from "@angular/core";
import { UpdateDate } from "src/app/models/update-date";
import { UpdateDateService } from "src/app/_services/update-date.service";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"],
})
export class Step2Component implements OnInit {
  hasSelectedProduct: boolean;
  childDataReceived: string = "";
  constructor() {
    this.hasSelectedProduct = false;
  }

  ngOnInit(): void {}

  getHasSelectedProduct(event: boolean) {
    this.hasSelectedProduct = event;
  }
}
