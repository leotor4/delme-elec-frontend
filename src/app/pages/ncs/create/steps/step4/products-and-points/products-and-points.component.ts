import { Component, OnInit } from '@angular/core';
import {NonComplianceService} from "../../../../../../_services/non-compliance.service";

@Component({
  selector: 'app-products-and-points',
  templateUrl: './products-and-points.component.html',
  styleUrls: ['./products-and-points.component.css']
})
export class ProductsAndPointsComponent implements OnInit {
  percent= Math.floor(parseInt(this.nonComplicanceService.quantNc)/parseInt(this.nonComplicanceService.quantTotal)*100);

  constructor(public nonComplicanceService: NonComplianceService) { }

  ngOnInit(): void {
  }

}
