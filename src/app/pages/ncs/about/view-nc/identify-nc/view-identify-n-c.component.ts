import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-identify-nc',
  templateUrl: './view-identify-n-c.component.html',
  styleUrls: ['./view-identify-n-c.component.css']
})
export class ViewIdentifyNCComponent implements OnInit {
  images1= ["imagem1", "imagem2", "imagem3", "imagem4", "imagem5", "imagem1", "imagem2", "imagem3", "imagem4", "imagem5"];
  images2 = ["imagem1", "imagem2", "imagem3", "imagem4", "imagem5", "imagem1", "imagem2", "imagem3", "imagem4", "imagem5"];
  ncID = "001/2022";

  constructor() { }

  ngOnInit(): void {
  }

}
