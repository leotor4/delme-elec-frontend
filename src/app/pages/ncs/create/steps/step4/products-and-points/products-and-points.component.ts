import { Component, OnInit } from '@angular/core';
import {NonComplianceService} from "../../../../../../_services/non-compliance.service";

@Component({
  selector: 'app-products-and-points',
  templateUrl: './products-and-points.component.html',
  styleUrls: ['./products-and-points.component.css']
})
export class ProductsAndPointsComponent implements OnInit {

  constructor(public nonComplicanceService: NonComplianceService) { }

  ngOnInit(): void {
  }

}
