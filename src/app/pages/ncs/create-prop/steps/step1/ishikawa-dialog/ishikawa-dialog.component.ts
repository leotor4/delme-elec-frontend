import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-ishikawa-dialog',
  templateUrl: './ishikawa-dialog.component.html',
  styleUrls: ['./ishikawa-dialog.component.css']
})
export class IshikawaDialogComponent implements OnInit {
  stepPosition: number = 1;

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.stepPosition = this.config.data.page
  }
  isFirstStep() {
    return this.stepPosition === 1;
  }
  isLastStep() {
    return this.stepPosition === 6;
  }
  nextStep() {
    if (this.stepPosition >= 6) return;
    this.stepPosition++;
    this.isLastStep()
  }
  backStep() {
    if (this.stepPosition <= 1) return;
    this.stepPosition--;
    this.isFirstStep();
    console.log(this.stepPosition)
  }

  close() {
    this.ref.close();
  }
}
