import { Component, OnInit } from '@angular/core';
import {SgqService} from "../../sgq.service";

@Component({
  selector: 'app-changes',
  templateUrl: './changes.component.html',
  styleUrls: ['./changes.component.css']
})
export class ChangesComponent implements OnInit {

  constructor(public sgqServ: SgqService) { }

  ngOnInit(): void {
  }

}
