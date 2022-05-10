import { Component, OnInit } from '@angular/core';
import {ProposalService} from "../../proposal.service";

@Component({
  selector: 'app-reasons-why',
  templateUrl: './reasons-why.component.html',
  styleUrls: ['./reasons-why.component.css']
})
export class ReasonsWhyComponent implements OnInit {
  stepPosition: number = 0;
  showAllTextAreas: boolean = false;
  constructor(public propService: ProposalService) { }

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
