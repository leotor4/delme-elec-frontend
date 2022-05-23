import { Component, OnInit } from '@angular/core';
import {SgqService} from "../../sgq.service";

@Component({
  selector: 'app-evidence',
  templateUrl: './evidence.component.html',
  styleUrls: ['./evidence.component.css']
})
export class EvidenceComponent implements OnInit {

  constructor(public sgqServ: SgqService) { }

  ngOnInit(): void {
  }

}
