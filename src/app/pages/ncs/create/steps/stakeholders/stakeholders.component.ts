import { Component, OnInit } from '@angular/core';
interface Contact {
  name: string;
  email: string;
  cType: string;
}

const CONTACTS: Contact[] = [
  {
    name: "lucas",
    email: "lucas@gmail.com",
    cType: "emissor",
  },
  {
    name: 'João',
    email: "João@gmail.com",
    cType: "Area afetada"
  },
  {
    name: 'Ednaldo',
    email: "Ednaldo@gmail.com",
    cType: "emissor",
  },
  {
    name: 'Lucio',
    email: "Lucio@gmail.com",
    cType: "emissor",
  }
];
@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.css']
})

export class StakeholdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  contacts = CONTACTS;
}
