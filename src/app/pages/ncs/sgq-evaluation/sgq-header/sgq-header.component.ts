import { Component, OnInit } from '@angular/core';
import {SgqService} from "../sgq.service";

@Component({
  selector: 'app-sgq-header',
  templateUrl: './sgq-header.component.html',
  styleUrls: ['./sgq-header.component.css']
})
export class SgqHeaderComponent implements OnInit {

  constructor(public sgqServ: SgqService) { }

  ngOnInit(): void {
  }

  salvarSGQ() {
    this.sgqServ.post().subscribe(next=>{
      console.log(next)
    })
  }
}
