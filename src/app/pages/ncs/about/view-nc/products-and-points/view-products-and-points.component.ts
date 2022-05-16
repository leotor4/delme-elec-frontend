import {Component, OnInit} from '@angular/core';
import {AboutService} from "../../about.service";

@Component({
  selector: 'app-view-products-and-points',
  templateUrl: './view-products-and-points.component.html',
  styleUrls: ['./view-products-and-points.component.css']
})
export class ViewProductsAndPointsComponent implements OnInit {

  constructor(public aboutSrvc: AboutService) { }

  ngOnInit(): void {

  }

  getPercent(){
    return Math.round((this.aboutSrvc.nc?.quant_nc*100) / this.aboutSrvc.nc?.quant_total)
  }

}
