import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MessageService} from "primeng/api";
import { ProposalService } from '../proposal.service';
import {DialogService} from "primeng/dynamicdialog";
import {DadosNCComponent} from "../../../dialogs/dados-nc/dados-nc.component";
import {TranslateService} from "@ngx-translate/core";

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
    public dialogService: DialogService,
    public translate: TranslateService
  ) { }

  saveProp(){
    this.propService.popular()
    this.propService.put().subscribe({
       next:(data:any )=> {
        this.messageService.add({
          severity: "success",
          summary: this.translate.instant("createProp.success2"),
          life: 3000,
        });
        
      },
      error:err =>{
        this.messageService.add({
          severity: "error",
          summary: this.translate.instant("createProp.fail3"),
          life: 3000,
        });
      }
    })
  }

  ngOnInit(): void {
     this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
   
    this.propService.getSectors()
  }

  openDados(){
    const ref = this.dialogService.open(DadosNCComponent, {
      width: '1100px',
      closable: true,
      showHeader: false
    });
  }

}
