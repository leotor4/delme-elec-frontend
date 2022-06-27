import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-waiting-product',
  templateUrl: './waiting-product.component.html',
  styleUrls: ['./waiting-product.component.css']
})
export class WaitingProductComponent implements OnInit {

  @Input()
  titleFigure:string;
  @Input()
  image:string;

  constructor() { }

  ngOnInit(): void {
  }

}
