import { Component, OnInit } from '@angular/core';
import {Contact} from "../../../../../models/contact.model";
import {AboutService} from "../../about.service";

@Component({
  selector: 'app-view-stakeholders',
  templateUrl: './view-stakeholders.component.html',
  styleUrls: ['./view-stakeholders.component.css']
})
export class ViewStakeholdersComponent implements OnInit {

  constructor(public aboutSrvc: AboutService) { }

  ngOnInit(): void {
  }

}
