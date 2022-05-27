import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import {NonCompliance} from "../../../../../models/non-compliance";

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent implements OnInit {

  constructor(public ref: DynamicDialogRef,public ncService:NonComplianceService,private messageService:MessageService,private route:Router) { }

  ngOnInit(): void {
  }

  cancelarNc(){
    this.ncService.nc.status = "canceled"
    this.ncService.put().subscribe({
      next: data => {
        this.route.navigate(['/ncs'])
        this.ref.close();
        this.ncService.nc= new NonCompliance()
        this.messageService.add({
          key: "myKey1",
          severity: "success",
          summary: "Não conformidade cancelada com sucesso.",
          life: 3000,
        });
      },
      error: err => {
        this.messageService.add({
          key: "myKey1",
          severity: "error",
          summary: "Houve um problema ao cancelar não conformidade.",
          life: 3000,
        });
        
      }
    });
  }

  voltar(){
    this.ref.close();
  }

}
