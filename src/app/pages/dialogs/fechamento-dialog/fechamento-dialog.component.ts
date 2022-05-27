import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';



@Component({
  selector: 'app-fechamento-dialog',
  templateUrl: './fechamento-dialog.component.html',
  styleUrls: ['./fechamento-dialog.component.css']
})
export class FechamentoDialogComponent implements OnInit {

  constructor(public ref: DynamicDialogRef,) { }
  close(){
    this.ref.close()
  }
  
  radioValue:string;
  editorValue = "";
  ngOnInit(): void {
    this.radioValue = "sim"
  }

}
