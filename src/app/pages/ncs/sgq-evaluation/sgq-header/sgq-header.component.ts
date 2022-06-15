import { Component, OnInit } from '@angular/core';
import {SgqService} from "../sgq.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sgq-header',
  templateUrl: './sgq-header.component.html',
  styleUrls: ['./sgq-header.component.css']
})
export class SgqHeaderComponent implements OnInit {
    id: number;

  constructor(public sgqServ: SgqService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
  }

  salvarSGQ() {
    this.sgqServ.post().subscribe(next=>{
      console.log(next)
    })
  }
}
