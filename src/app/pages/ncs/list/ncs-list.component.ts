import { Router } from '@angular/router';
import { TokenStorageService } from './../../../_services/token-storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterMatchMode, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { Nc } from 'src/app/models/nc.model';

import { NcsService } from '../ncs.service';

@Component({
  selector: 'app-ncs-list',
  templateUrl: './ncs-list.component.html',
  styleUrls: ['./ncs-list.component.css']
})
export class NcsListComponent implements OnInit {

  @ViewChild('dt') dt: Table;
  listNcs: any[] = [];
  cols: any[];
  first = 0;
  totalRecords = 0
  rows = 5;


  constructor(private ncsService : NonComplianceService, private tokenService : TokenStorageService, 
    private router : Router, private config: PrimeNGConfig, ) { }

  ngOnInit(): void {
    this.ncsService.get().subscribe((data: any) => {
      this.ncsService.ncs = data.noncompliances;

      for (let i = 0; i < this.ncsService.ncs.length; i++) {
        
        let nc = this.ncsService.ncs[i]

        if (nc.system_status == 'deleted' || nc.system_status == 'archived') { continue }

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
    this.ncsService.delete(idNc).subscribe((data: any) => {
      
      window.location.reload();
    });  
  }

  edit(idNc : number, status : string) {
    if (status.toUpperCase() == 'ABERTA') {
      this.router.navigate(["/ncs/create/"]);
    } else {
      this.router.navigate(["/ncs/about/", idNc]);
    }
    
  }
}
