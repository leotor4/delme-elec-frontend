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
            console.log(item)
              return new NcsListDTO(item)
        })
      }

      console.log(this.listNcs)

      // for (let i = 0; i < this.ncsService.ncs.length; i++) {
        
      //   let nc = this.ncsService.ncs[i]
      //   console.log('checa nc', nc)

      //   if (nc.system_status == 'deleted' || nc.system_status == 'arquived') { continue }

      //   let strParceiro
        
        

      //   //let strEmissor: string = nc['emissor']['username']
      //   var ncElementList = {
      //     id : nc.id,
      //     numero : nc.code,
      //     parceiro : strParceiro,
      //     emissor : 'admin',
      //     estado : nc.status
      //   };

        

      //   this.listNcs.push(ncElementList);

      // }


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
    this.ncsService.archived(idNc).subscribe((data: any) => {

      window.location.reload();

    });
  }

  delete(idNc: number) {

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ncsService.delete(idNc).subscribe((data: any) => {
          window.location.reload();
        });
      },
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
