import { Component, OnInit } from '@angular/core';
import {Contact} from "../../../../../../models/contact.model";
import {NonComplianceService} from "../../../../../../_services/non-compliance.service";

@Component({
  selector: 'app-stakeholders',
  templateUrl: './stakeholders.component.html',
  styleUrls: ['./stakeholders.component.css']
})
export class StakeholdersComponent implements OnInit {

  constructor(public nonComplicanceService: NonComplianceService) { }

  ngOnInit(): void {
  }

}
