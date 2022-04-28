import { Component, OnInit } from '@angular/core';
import {Contact} from "../../../../../models/contact.model";

@Component({
  selector: 'app-view-stakeholders',
  templateUrl: './view-stakeholders.component.html',
  styleUrls: ['./view-stakeholders.component.css']
})
export class ViewStakeholdersComponent implements OnInit {
    contactsList: Contact[] = [
      {
        "name": "Hurst Clayton",
        "email": "hurstclayton@enersol.com",
        "type": "test"
      },
      {
        "name": "Nielsen Beard",
        "email": "nielsenbeard@enersol.com",
        "type": "test"
      },
      {
        "name": "Sellers Lindsay",
        "email": "sellerslindsay@enersol.com",
        "type": "test"
      },
      {
        "name": "Dunn Mitchell",
        "email": "dunnmitchell@enersol.com",
        "type": "test"
      }

    ];

  constructor() { }

  ngOnInit(): void {
  }

}
