import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"],
})
export class ProductInfoComponent implements OnInit {
  @Input("hasProduct") hasProduct: boolean;
  @Input("product") product: any;
  constructor() {}

  ngOnInit(): void {}
}
