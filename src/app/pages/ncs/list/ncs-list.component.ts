import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilterMatchMode, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { NonComplianceService } from "src/app/_services/non-compliance.service";


@Component({
  selector: 'app-ncs-list',
  templateUrl: './ncs-list.component.html',
 
  styleUrls: ['./ncs-list.component.css'],
  providers:[
    MessageService
  ],
})
export class NcsListComponent implements OnInit {

  @ViewChild('dt') dt: Table;
  listNcs: any[] = [];
  cols: any[];
  first = 0;
  rows = 5;

  openNc(){
    this.ncsService.abrirNc().subscribe(
      {
        next: (response:any) => {
          this.ncsService.nc.code = response['nonCompliance']['code']
          this.ncsService.nc.issuer = response['nonCompliance']['emissor']
          this.ncsService.nc.id = response['nonCompliance']['id']
          this.ncsService.nc.status = response['nonCompliance']['status']
          this.route.navigate(['ncs/create'])
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


  constructor(private route:Router,private ncsService : NonComplianceService, private config: PrimeNGConfig,public messageService:MessageService) { }

  ngOnInit(): void {

    
    this.ncsService.get().subscribe((data: any) => {
      
      this.ncsService.ncs = data.noncompliances;
      
      for (let i = 0; i < this.ncsService.ncs.length; i++) {
        
        let nc = this.ncsService.ncs[i]
        let strParceiro
        
        switch (nc.tipos_parceiro_item?.toUpperCase()) {
          case 'INTERNO':
            strParceiro = nc.sector?.name
            break
          case 'CLIENTE':
            strParceiro = nc.customer?.responsible_name
            break
          case 'PROVIDER':
            strParceiro = nc.provider?.responsible_name
            break
          default:
            strParceiro = 'Teste'
            break
          
        }

        var ncElementList = {
          id : nc.id,
          numero : nc.code,
          parceiro : strParceiro,
          emissor : 'a fazer',
          estado : nc.status
        };

        

        this.listNcs.push(ncElementList);

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
      
      console.log(data)
      window.location.reload();
    });
  }

  delete(idNc: number) {
    this.ncsService.delete(idNc).subscribe((data: any) => {
      
      console.log(data)
      window.location.reload();
    });  
  }
}
