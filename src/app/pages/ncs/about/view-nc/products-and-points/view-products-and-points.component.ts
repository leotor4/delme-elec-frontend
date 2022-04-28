import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-products-and-points',
  templateUrl: './view-products-and-points.component.html',
  styleUrls: ['./view-products-and-points.component.css']
})
export class ViewProductsAndPointsComponent implements OnInit {
  percent= 5;

  constructor() { }

  ngOnInit(): void {
  }

}
