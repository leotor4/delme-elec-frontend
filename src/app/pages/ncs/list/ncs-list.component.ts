import { NonCompliance } from 'src/app/models/non-compliance';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, FilterMatchMode, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { NcsListDTO } from './ncs-list-dto';

@Component({
  selector: 'app-ncs-list',
  templateUrl: './ncs-list.component.html',
 
  styleUrls: ['./ncs-list.component.css'],
  providers:[
    MessageService, ConfirmationService
  ],
})
export class NcsListComponent implements OnInit {

  @ViewChild('dt') dt: Table;
  listNcs: Array<NcsListDTO> = [];
  cols: any[];
  first = 0;
  totalRecords = 0
  rows = 5;
  msg: string
  msgType: string

  openNc(){
    this.ncsService.abrirNc().subscribe(
      {
        next: (response:any) => {
          this.ncsService.nc.code = response['nonCompliance']['code']
          this.ncsService.nc.issuer = response['nonCompliance']['emissor']
          this.ncsService.nc.id = response['nonCompliance']['id']
          this.ncsService.nc.status = response['nonCompliance']['status']
          this.router.navigate(["/ncs/create/", this.ncsService.nc.id])
        },
        error: err => {
          this.messageService.add({
            key: "myKey2",
            severity: "error",
            summary: "Houve um problema ao criar não conformidade.",
            life: 3000,
          });
        }
      }
    )
  }


  constructor(
    private router:Router,private ncsService : NonComplianceService, private route: ActivatedRoute, 
    private config: PrimeNGConfig,public messageService:MessageService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    

    this.ncsService.get().subscribe((data: any) => {
      
      if (this.ncsService.msgHome) {
        this.messageService.add({
          key: "myKey2",
          severity: this.ncsService.typeMsgHome,
          summary: this.ncsService.msgHome,
          life: 3000,
        });

        this.ncsService.msgHome = ""
        this.ncsService.typeMsgHome = ""
      }
    
      //this.listNcs.append(data.noncompliances);

      const compliances: Array<NonCompliance> = data.noncompliances

      console.log(compliances)


      if (compliances?.length > 0) {
        this.listNcs = compliances.map(
          (item:NonCompliance) => {
              return new NcsListDTO(item)
        })
        this.listNcs = this.listNcs.filter(item => (item.system_status !== 'deleted' && item.system_status != 'arquived'));
      }


      this.config.filterMatchModeOptions = {
        text: [
            FilterMatchMode.STARTS_WITH,
            FilterMatchMode.CONTAINS,
            FilterMatchMode.NOT_CONTAINS,
            FilterMatchMode.ENDS_WITH,
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS
        ],
        numeric: [
            FilterMatchMode.EQUALS,
            FilterMatchMode.NOT_EQUALS,
            FilterMatchMode.LESS_THAN,
            FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
            FilterMatchMode.GREATER_THAN,
            FilterMatchMode.GREATER_THAN_OR_EQUAL_TO
        ],
        date: [
            FilterMatchMode.DATE_IS,
            FilterMatchMode.DATE_IS_NOT,
            FilterMatchMode.DATE_BEFORE,
            FilterMatchMode.DATE_AFTER
        ]
      }
      this.totalRecords = this.listNcs.length
    });
  }


  

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.listNcs ? this.first === (this.listNcs.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.listNcs ? this.first === 0 : true;
  }


  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

 

  archived(idNc: number) {
    this.confirmationService.confirm({
      message: 'Esta ação irá alterar o status da NC arquivada, deseja prosseguir com a operação?',
      header: 'Arquivar NC',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ncsService.delete(idNc).subscribe((data: any) => {
          this.messageService.add({
            key: "myKey2",
            severity: 'success',
            summary: 'Operação realizada!',
            life: 5000,
          });
          window.location.reload();

        });
      },

      reject:() => {
        this.messageService.add({
          key: "myKey2",
          severity: 'info',
          summary: 'Operação Cancelada',
          life: 5000,
        });
        
      }
  });
  }

  delete(idNc: number) {

    this.confirmationService.confirm({
      message: 'Esta ação irá alterar o status da NC para deletada, deseja prosseguir com a operação?',
      header: 'Deletar NC',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ncsService.delete(idNc).subscribe((data: any) => {
          this.messageService.add({
            key: "myKey2",
            severity: 'success',
            summary: 'Operação realizada!',
            life: 5000,
          });
          window.location.reload();

        });
      },

      reject:() => {
        this.messageService.add({
          key: "myKey2",
          severity: 'info',
          summary: 'Operação Cancelada',
          life: 5000,
        });
        
      }
  });
      
  }

  edit(idNc : number, status : string) {
    if (status.toUpperCase() == 'OPEN') {
      this.router.navigate(["/ncs/create/", idNc]);
    } else {
      this.router.navigate(["/ncs/about/", idNc]);
    }
    
  }
  
}
