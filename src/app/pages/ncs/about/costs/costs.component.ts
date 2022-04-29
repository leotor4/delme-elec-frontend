import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costs',
  templateUrl: './costs.component.html',
  styleUrls: ['./costs.component.css']
})
export class CostsComponent implements OnInit {
    documents: any[] = [
      {
        "name": "NF-XXX",
        "date": "03/01/1978",
        "annexBy": "Dotty Shama",
        "price": "R$489.62"
      },
      {
        "name": "NF-XXX",
        "date": "18/05/1987",
        "annexBy": "Elise Leary",
        "price": "R$608.63"
      },
      {
        "name": "NF-XXX",
        "date": "31/05/2021",
        "annexBy": "Rani Hamil",
        "price": "R$908.81"
      },
      {
        "name": "NF-XXX",
        "date": "12/11/1985",
        "annexBy": "Courtnay Roscoe",
        "price": "R$413.68"
      },
      {
        "name": "NF-XXX",
        "date": "30/08/1951",
        "annexBy": "Adore Fax",
        "price": "R$156.57"
      }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
