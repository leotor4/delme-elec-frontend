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
  listNcs: Nc[];
  cols: any[];
  first = 0;
  rows = 5;


  constructor(private ncsService : NonComplianceService, private config: PrimeNGConfig) { }

  ngOnInit(): void {

    this.ncsService.get().subscribe((data: any) => {
      console.log('teste')
      this.ncsService.ncs = data.noncompliances;
      //console.log(this.ncsService.ncs);
      
      for (let i = 0; i < this.ncsService.ncs.length; i++) {
        
        console.log(this.ncsService.ncs[i])
        /*
        let parceiro

        if this.ncsService.ncs[i].tipos_parceiro_item.toUpperCase == 'INTERNO' {
          parceiro = this.ncsService.ncs[i].sector
        }


        var ncElementList = {
          numero: this.ncsService.ncs[i].code,
          parceiro: this.ncsService.ncs[i].parceiro,
        }
        */
      }


    });

    this.listNcs = [
      { numero : '1', parceiro : 'Daniel', emissor : 'Emissor', estado : 'Estado' },
      { numero : '2', parceiro : 'Rafael', emissor : 'Emissor', estado : 'Estado' },
      { numero : '3', parceiro : 'Carlos', emissor : 'Emissor', estado : 'Estado' },
      { numero : '4', parceiro : 'Marcelo', emissor : 'Emissor', estado : 'Estado' },
      { numero : '5', parceiro : 'Lucas', emissor : 'Emissor', estado : 'Estado' },
      { numero : '6', parceiro : 'Parjasnely', emissor : 'Emissor', estado : 'Estado' },
      { numero : '7', parceiro : 'Ricardo', emissor : 'Emissor', estado : 'Estado' },
      { numero : '8', parceiro : 'Victor', emissor : 'Emissor', estado : 'Estado' },
      { numero : '9', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '10', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '11', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '12', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '13', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '14', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '15', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '16', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '17', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '18', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '19', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '20', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' },
      { numero : '21', parceiro : 'Parceiro', emissor : 'Emissor', estado : 'Estado' }

    ]

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

    /*
    this.ncsService.getNcs().subscribe({
      next: data => {
        //TODO
      }

    });*/
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
}
