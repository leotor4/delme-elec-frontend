import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {SgqService} from "./sgq.service";
import {NonComplianceService} from "../../../_services/non-compliance.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-create-prop',
  templateUrl: './sgq.component.html',
  styleUrls: ['./sgq.component.css'],
  providers: [MessageService]
})
export class SgqComponent implements OnInit {

  constructor(private ncService:NonComplianceService, private route: ActivatedRoute, private sgqSrv: SgqService, private messageService: MessageService) { }

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id')||"")


    this.sgqSrv.sgq.nonCompliance_id = id;

    this.ncService.getById(id).subscribe({
      next:(data:any) =>{

        this.sgqSrv.nc = data.nc[0]
        if(!this.sgqSrv.nc.sgqEvaluation){
          this.sgqSrv.abrirSGQ(id).subscribe({
            next:(data:any )=> {
              this.sgqSrv.sgq = data['sgq']
              this.sgqSrv.sgq.attachments = []
              this.messageService.add({
                severity: "success",
                summary: "Avaliação SGQ criada com sucesso.",
                life: 3000,
              });
            },
            error:err =>{
              this.messageService.add({
                severity: "error",
                summary: "Houve um erro ao criar Avaliação SGQ.",
                life: 3000,
              });
            }
          })
        } else{
          this.sgqSrv.sgq = this.sgqSrv.nc.sgqEvaluation
          console.log(this.sgqSrv.sgq )
          console.log(this.sgqSrv.nc.sgqEvaluation)
        }
      }
    })


  }

}
