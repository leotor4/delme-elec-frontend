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
        console.log(this.sgqSrv.nc)
      }
    })

    this.sgqSrv.abrirSGQ(id).subscribe({
      next:(data:any )=> {
        this.sgqSrv.sgq.id = data['sgq']['id']

        this.messageService.add({
          severity: "success",
          summary: "Proposta de solução criada com sucesso.",
          life: 3000,
        });
      },
      error:err =>{
        this.messageService.add({
          severity: "error",
          summary: "Houve um erro ao criar proposta de solução.",
          life: 3000,
        });
      }
    })
  }

}
