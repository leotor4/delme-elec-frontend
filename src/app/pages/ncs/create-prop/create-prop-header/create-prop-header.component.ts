import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from "primeng/api";
import { ProposalService } from '../proposal.service';
import {DialogService} from "primeng/dynamicdialog";
import {IshikawaDialogComponent} from "../steps/step1/ishikawa-dialog/ishikawa-dialog.component";
import {DadosNCComponent} from "../../../dialogs/dados-nc/dados-nc.component";

@Component({
  selector: 'app-create-prop-header',
  templateUrl: './create-prop-header.component.html',
  styleUrls: ['./create-prop-header.component.css'],
  providers: [DialogService]
})
export class CreatePropHeaderComponent implements OnInit {
  id:number
  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    public propService:ProposalService,
    public dialogService: DialogService
  ) { }

  saveProp(){

    this.propService.popular()
    this.propService.put().subscribe({
       next:(data:any )=> {
        this.messageService.add({
          severity: "success",
          summary: "Proposta de solução salva com sucesso.",
          life: 3000,
        });
        
      },
      error:err =>{
        this.messageService.add({
          severity: "error",
          summary: "Houve um erro ao salvar passo proposta de solução." ,
          life: 3000,
        });
      }
    })
  }

  ngOnInit(): void {
     this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
  }

  openDados(){
    const ref = this.dialogService.open(DadosNCComponent, {
      width: '1100px',
      closable: true,
      showHeader: false
    });
  }

}
