import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ClosingService} from "../../ncs/about/closing/closing.service";
import {Closing} from "../../../models/closing";
import {MessageService} from "primeng/api";
import { AboutService } from '../../ncs/about/about.service';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import {TranslateService} from "@ngx-translate/core";



@Component({
  selector: 'app-fechamento-dialog',
  templateUrl: './fechamento-dialog.component.html',
  styleUrls: ['./fechamento-dialog.component.css']
})
export class FechamentoDialogComponent implements OnInit {
  closing = new Closing()

  constructor(public ref: DynamicDialogRef,
              public cServ: ClosingService,
              public config: DynamicDialogConfig,
              public ncService:NonComplianceService,
              private messageService: MessageService,
              public translate: TranslateService
  ) {}
  close(){
    this.ref.close()
  }
  
  radioValue:string;
  editorValue = "";

  ngOnInit(): void {
    this.closing.nonCompliance_id = this.config.data.id;
    this.radioValue = "sim"
  }

  save() {
    this.closing.comment = this.editorValue
    this.ncService.closeNc(this.config.data.id).subscribe(
            {
              next:(data)=>{
                 this.cServ.post(this.closing).subscribe(
        {
          next:(data) => {
            this.close()
          this.messageService.add({
            severity: "info",
            summary: this.translate.instant('closeNC.success'),
            life: 3000,
          });
          
        },
        error:(error) => {
          this.messageService.add({
            severity: "error",
            summary: error,
            life: 3000,
          });
          this.ref.close();
        }
        }
    );
              },
              error:(err)=>{}
            }
          )
    this.closing.is_satisfied = this.radioValue == "sim";
    
  }
}
