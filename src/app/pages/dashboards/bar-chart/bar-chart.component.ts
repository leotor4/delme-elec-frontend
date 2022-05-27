import { Component, OnInit } from '@angular/core';
import { DashboardsService } from '../dashboards.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

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
xAxisLabel: string = '';
yAxisLabel: string = '';
timeline: boolean = true;

barDataTest:any = [

  {
    name: '',
    value: ''
  }

]


  constructor(private dashboardsService: DashboardsService) { }

  ngOnInit(): void {
    this.dashboardsService.getBarChartStatus('0').subscribe((data:any) => {
      this.barDataTest = data
    });


  }


  onOptionsSelected(value:string){

    this.dashboardsService.getBarChartStatus(value).subscribe((data:any) => {
      this.barDataTest = data
    });
    
 
  }
}
