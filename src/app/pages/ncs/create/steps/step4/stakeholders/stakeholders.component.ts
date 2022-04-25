import { Component, OnInit } from '@angular/core';
import {Contact} from "../../../../../../models/contact.model";
import {NonComplianceService} from "../../../../../../_services/non-compliance.service";

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.css']
})
export class StakeholdersComponent implements OnInit {
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

  constructor(public nonComplicanceService: NonComplianceService) { }

  ngOnInit(): void {
  }

}
