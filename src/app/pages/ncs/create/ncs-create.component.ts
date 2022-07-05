import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { NonCompliance } from "src/app/models/non-compliance";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { IdentificacaoNCDTO } from './steps/step1/identificacao-da-nc/identificacao-nc-dto';
import momentImported from 'moment';
import {TranslateService} from "@ngx-translate/core";
const moment = momentImported;



@Component({
  selector: "app-ncs-create",
  templateUrl: "./ncs-create.component.html",
  styleUrls: ["./ncs-create.component.css"],
})
export class NcsCreateComponent implements OnInit {
  

  items: MenuItem[];
  constructor(private router: Router,public ncService:NonComplianceService, private route: ActivatedRoute, private messageService:MessageService,
              public translate: TranslateService) {}
  
  ngOnDestroy(): void {
    this.ncService.nc = new NonCompliance()
   
  }

  ngOnInit() {
    this.ncService.formIdentificacaoNC.reset();
    this.ncService.autoCompleteValue = ''
    this.ncService.autoCompleteItValue = ''
    this.ncService.autoCompletePrValue = ''
    this.ncService.pesquisar = ''
    
    let id = parseInt(this.route.snapshot.paramMap.get('id')||"")
    this.ncService.getById(id).subscribe(
      {
        next: (response:any) => {
          this.ncService.nc = new NonCompliance(response['nc'][0]);
          this.setDates(this.ncService.nc);

          switch(this.ncService.nc.tipos_parceiro_item){
          case "Cliente":
          this.ncService.nc.partner = this.ncService.nc.customer
            break;
            case "Fornecedor":
              this.ncService.nc.partner = this.ncService.nc.provider
            break;
            case "Interno":
              this.ncService.nc.partner = this.ncService.nc.sector
            break;
         }
        if(this.ncService.nc.partner){
          this.ncService.editarEmailItem = this.ncService.nc.partner.responsible_email
          this.ncService.editarNomeItem = this.ncService.nc.partner.responsible_name
          this.ncService.editarTelefoneItem = this.ncService.nc.partner.responsible_phone
         }

         if(this.ncService.nc.procedure){
           this.ncService.autoCompletePrValue = this.ncService.nc.procedure
         }

         if(this.ncService.nc.instruction){
           this.ncService.autoCompleteItValue = this.ncService.nc.instruction
         }


          this.ncService.formIdentificacaoNC.patchValue(new IdentificacaoNCDTO(this.ncService.nc));
        },
        error: err => {
          this.messageService.add({
            severity: "error",
            summary: this.translate.instant("newNC.error"),
            life: 3000,
          });
        }
      }
    )
  }


  setDates(nc:NonCompliance) {
    nc.data_abertura = moment().toDate()
    nc.data_fechamento = moment().add('d', 30).toDate()

    this.ncService.nc.data_abertura = moment().toDate()
    this.ncService.nc.data_fechamento = moment().add('d', 30).toDate()

  }
}
