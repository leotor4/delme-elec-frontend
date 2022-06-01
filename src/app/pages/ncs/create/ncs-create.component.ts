import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, MessageService } from "primeng/api";
import { NonCompliance } from "src/app/models/non-compliance";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { IdentificacaoNCDTO } from './steps/step1/identificacao-da-nc/identificacao-nc-dto';
import momentImported from 'moment'; 
const moment = momentImported;



@Component({
  selector: "app-ncs-create",
  templateUrl: "./ncs-create.component.html",
  styleUrls: ["./ncs-create.component.css"],
})
export class NcsCreateComponent implements OnInit {
  

  items: MenuItem[];
  constructor(private router: Router,public ncService:NonComplianceService, private route: ActivatedRoute, private messageService:MessageService) {}
  
  ngOnDestroy(): void {
    this.ncService.nc = new NonCompliance()
  }

  ngOnInit() {
    this.ncService.formIdentificacaoNC.reset();
    let id = parseInt(this.route.snapshot.paramMap.get('id')||"")
    
    this.ncService.getById(id).subscribe(
      {
        next: (response:any) => {
          this.ncService.nc = new NonCompliance(response['nc'][0]);
          this.setDates(this.ncService.nc);
          console.log('Teste',response['nc'][0]);
          console.log('Teste2', this.ncService.nc);

          this.ncService.formIdentificacaoNC.patchValue(new IdentificacaoNCDTO(this.ncService.nc));
        },
        error: err => {
          this.messageService.add({
            key: "myKey2",
            severity: "error",
            summary: "Houve um problema ao consultar esta NC!",
            life: 3000,
          });
        }
      }
    )

    this.items = [
      { label: "Identificar não conformidade" },
      { label: "Produtos e Pontos" },
      { label: "Partes Interessadas" },
      { label: "Revisar Informações" },
    ];
  }


  setDates(nc:NonCompliance) {
    nc.data_abertura = moment(new Date()).toDate()
    nc.data_fechamento = moment(new Date()).add('d', 30).toDate()
  }
}
