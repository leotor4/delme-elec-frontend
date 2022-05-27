import { DashboardsService } from './dashboards.service';
import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];


  // options
  color:string = 'fire'
  legend: boolean = true;
  gradient: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  showLabels: boolean = true;
  xAxisLabel: string = 'Setor';
  yAxisLabel: string = 'Quantidade de NCs';
  timeline: boolean = true;

  groupedBarDataTest:any = [

    {
      name: '',
      series: []
    }
  ]

  
  constructor(private dashboardsService: DashboardsService) { 
  }

  ngOnInit(): void {
    this.dashboardsService.getGroupedBarChartStatusSetor('0').subscribe((data:any) => {
      this.groupedBarDataTest = data
      console.log(data)
    });
  }


  onOptionsSelected(value:string){

    this.dashboardsService.getGroupedBarChartStatusSetor(value).subscribe((data:any) => {
      this.groupedBarDataTest = data
    });
    
 
  }

}
