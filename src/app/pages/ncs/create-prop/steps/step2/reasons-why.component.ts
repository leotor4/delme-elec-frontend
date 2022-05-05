import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reasons-why',
  templateUrl: './reasons-why.component.html',
  styleUrls: ['./reasons-why.component.css']
})
export class ReasonsWhyComponent implements OnInit {
  stepPosition: number = 0;
  showAllTextAreas: boolean = false;
  textAreas: [string, string, string, string, string] = ["", "", "", "", ""]
  selectedValue: string;
  constructor() { }

  ngOnInit(): void {
  }
  isFirstStep() {
    return this.stepPosition === 0;
  }

  isLastStep() {
    return this.stepPosition === 4;
  }

  nextStep() {
    if (this.stepPosition >= 4) return;
    this.stepPosition++;
    this.isLastStep()
  }

  backStep() {
    if (this.stepPosition <= 0) return;
    this.stepPosition--;
    this.isFirstStep();
  }
}
