

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, FilterMatchMode, MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { NonCompliance } from 'src/app/models/non-compliance';

import { NcsListDTO } from './ncs-list-dto';
import { DashboardsService } from '../../dashboards/dashboards.service';

@Component({
  selector: 'app-ncs-list',
  templateUrl: './ncs-list.component.html',
 
  styleUrls: ['./ncs-list.component.css'],
  providers:[
     ConfirmationService
  ],
})
export class NcsListComponent implements OnInit {

  cardValues: any[] = [];
  gridColor = 'ocean'
  view = [500,300]
  pieValues: any[] = [];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'bottom';
  legendTitle = "legenda"

  colorScheme = {
    domain: ['rgb(0, 91, 123)', 'rgb(0, 91, 123)', 'rgb(0, 91, 123)', 'rgb(0, 91, 123)', 'rgb(0, 91, 123)', 'rgb(0, 91, 123)']
  };
  cardColor: string = '#00344D';


  lineChartData: any[] = [];

  //********line chart************
  

  lineChartView: any[] = [700, 300];

  lineChartLegend: boolean = true;
  lineChartShowLabels: boolean = true;
  lineChartAnimations: boolean = true;
  lineChartXAxis: boolean = true;
  lineChartYAxis: boolean = true;
  lineChartShowYAxisLabel: boolean = true;
  lineChartShowXAxisLabel: boolean = true;
  lineChartXAxisLabel: string = 'Mês';
  lineChartYAxisLabel: string = 'Qtd de NCs';
  lineChartTimeline: boolean = true;
  //********line chart************


  @ViewChild('dt') dt: Table;
  listNcs: Array<NcsListDTO> = [];
  cols: any[];
  first = 0;
  totalRecords = 0
  rows = 5;


  openNc(){

    this.ncsService.abrirNc().subscribe(
      {
        next: (response:any) => {
          this.messageService.add({
            severity: "success",
            summary: "NC criada com sucesso",
            life: 3000,
          });
          
          this.ncsService.nc.code = response['nonCompliance']['code']
          this.ncsService.nc.issuer = response['nonCompliance']['emissor']
          this.ncsService.nc.id = response['nonCompliance']['id']
          this.ncsService.nc.status = response['nonCompliance']['status']
          
          this.router.navigate(["/ncs/create/", this.ncsService.nc.id])
        },
        error: err => {
          this.messageService.add({
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
    private config: PrimeNGConfig,public messageService:MessageService, private dashboardService :DashboardsService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setDataLineChart()
    this.startListNcs('all')
  }


  startListNcs(filterStatus : string) {
    this.ncsService.get().subscribe((data: any) => {
      
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
      
      if(filterStatus == 'open')
        this.listNcs = this.listNcs.filter(item => (item.status == 'open'))
      if(filterStatus == 'canceled')
        this.listNcs = this.listNcs.filter(item => (item.status == 'canceled'))
      if(filterStatus == 'running')
        this.listNcs = this.listNcs.filter(item => (item.status == 'running'))
      if(filterStatus == 'late')
        this.listNcs = this.listNcs.filter(item => (item.status == 'late'))


      this.setDataCards(compliances, filterStatus)

      this.totalRecords = this.listNcs.length
    });
  }

  setDataCards(compliances: Array<NonCompliance>, filterStatus:string) {


    this.dashboardService.getKpisList(compliances).subscribe((data:any) => {
      this.cardValues = data
    });


    this.dashboardService.getPiesValues(compliances, filterStatus).subscribe((data:any) => {
      this.pieValues = data
    });
    
  }
  
  parseMonthStrToNumber(strMonth : string) : string {
    switch(strMonth) {
      case 'january':
        return '1';
      case 'february':
        return '2';
      case 'march':
        return '3';
      case 'april':
        return '4';
      case 'may':
        return '5';
      case 'june':
        return '6';
      case 'july':
        return '7';
      case 'august':
        return '8';
      case 'september':
        return '9';
      case 'october':
        return '10';
      case 'november':
        return '11';
      case 'december':
        return '12';
      default:
        return '0';
    }
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



  cancelNc(ncDto: NonCompliance) {
    this.confirmationService.confirm({
      message: 'Esta ação irá alterar o status da NC para cancelada, deseja prosseguir com a operação?',
      header: 'Cancelar NC',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        
        if (ncDto.id) {
          this.ncsService.getById(ncDto.id).subscribe(
            {
              next: (response:any) => {
                this.ncsService.nc = new NonCompliance(response['nc'][0]);              

                this.ncsService.nc.status = "canceled"
          
                this.ncsService.saveNc().subscribe({
                  next: data => {
                    this.messageService.add({
                      severity: "success",
                      summary: "Não conformidade cancelada com sucesso.",
                      life: 3000,
                    });
        
                    window.location.reload()
                  },
                  error: err => {
                    this.messageService.add({
                      severity: "error",
                      summary: "Houve um problema ao cancelar não conformidade.",
                      life: 3000,
                    });
                    
                  }
                });
        
              }
            }
          ) 
        }
      },

      reject:() => {
        this.messageService.add({
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
      this.messageService.add({
        severity: 'info',
        summary: 'O processo de abertura desta nc já foi concluído',
        life: 5000,
      });
    }    
  }

  visualizarInformacoes(idNc : number, status : string) {
    if (status.toUpperCase() == 'RUNNING') {
      this.router.navigate(["/ncs/about/", idNc]);
    } else if (status.toUpperCase() == 'OPEN'){
      this.messageService.add({
        severity: 'info',
        summary: 'Conclua a abertura da NC para poder visualizar as informações',
        life: 5000,
      });
    }    
  }


  onSelectCard(event : any) {
    if (event['name'] == 'Total de NCs') {
      this.startListNcs('all')
    }

    if (event['name'] == 'NCs em elaboração') {
      this.startListNcs('open')
    }

    if (event['name'] == 'NCs atrasadas') {
      this.startListNcs('late')
    }

    if (event['name'] == 'NCs canceladas') {
      this.startListNcs('canceled')
    }

    if (event['name'] == 'NCs em execução') {
      this.startListNcs('running')
    }
  }
  


  setDataLineChart() {
    this.dashboardService.getTimeLineValues().subscribe((data:any)=> {
       

      var seriesOpen = []
      var seriesClosed = []

      var lineChartDataAux = []
      console.log(data)
      

      if(data.open) {
        for (var element of data.open) {


          seriesOpen.push({
            "value": element.count,
            "name": this.parseMonthStrToNumber(element.month)
          })
        }
        lineChartDataAux.push({
          "name": "Em elaboração",
          "series": seriesOpen
        })



      }
      
      if(data.closed) {
        for (var element of data.closed) {
          seriesClosed.push({
            "value": element.count,
            "name": this.parseMonthStrToNumber(element.month)
          })
        }
        lineChartDataAux.push({
          "name": "Encerradas",
          "series": seriesClosed
        })
      }

      this.lineChartData = [...lineChartDataAux]

    });
  }
}
