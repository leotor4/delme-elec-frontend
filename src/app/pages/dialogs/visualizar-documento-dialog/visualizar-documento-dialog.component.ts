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
  type = "";
  src:string;

  isPdf():boolean{
    if (this.type.toLowerCase() == "pdf")return true
    return false
  }

  ngOnInit(): void {
    this.data = this.config.data.base64;
    this.type = this.config.data.type;
    if(this.isPdf()){
      this.src = "data:application/pdf;base64," + this.data;
    }else{
      this.src = "data:image/" + this.type +  ";base64," + this.data;
    }
  }
  
    
}
