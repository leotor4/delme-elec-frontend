import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-step2",
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.css"],
})
export class Step2Component implements OnInit {
  selectedValue: string = "val1";
  text: string;
  numbers: string[] = [
    "onne",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];
  haveSelectedProduct: boolean;
  output: string[];
  constructor() {}

  ngOnInit(): void {
    this.haveSelectedProduct = false;
  }

  search(event: any) {
    console.log("event", event);
    this.output = this.numbers.filter((c) => c.startsWith(event.query));
  }
}
