import { Component, OnInit } from "@angular/core";
type product = {
  id: number;
  name: string;
  description: string;
};
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
  test1(n: boolean) {
    this.hasSelectedProduct = n;
  }
  test2(string: any) {
    console.log(string);
  }
  ReceiveData(event: string) {
    console.log(event);
    this.childDataReceived = event;
  }
  Receive2Data(event: boolean) {
    this.hasSelectedProduct = event;
  }
}
