import { Component, Input, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: "app-visualizar-documento-dialog",
  templateUrl: "./visualizar-documento-dialog.component.html",
  styleUrls: ["./visualizar-documento-dialog.component.css"],
})
export class VisualizarDocumentoDialogComponent implements OnInit {
  constructor(public config: DynamicDialogConfig) {}
  data = "";
  src:string;

  ngOnInit(): void {
    this.data = this.config.data.base64;
    this.src = "data:application/pdf;base64," + this.data;
    console.log(this.data);
  }
  
    
}
