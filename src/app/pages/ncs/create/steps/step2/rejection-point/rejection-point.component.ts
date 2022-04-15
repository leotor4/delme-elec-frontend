import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-rejection-point",
  templateUrl: "./rejection-point.component.html",
  styleUrls: ["./rejection-point.component.css"],
})
export class RejectionPointComponent implements OnInit {
  textAreaAcoes: String;
  @Input("hasProduct") test: boolean;
  constructor() {}

  ngOnInit(): void {}
}
