import { Component, OnInit } from '@angular/core';
import {SgqService} from "../../sgq.service";

@Component({
  selector: 'app-reoccurrence',
  templateUrl: './reoccurrence.component.html',
  styleUrls: ['./reoccurrence.component.css']
})
export class ReoccurrenceComponent implements OnInit {

  constructor(public sgqServ: SgqService) { }

  ngOnInit(): void {
    this.sgqServ.getAllNC()
  }

    details(nc: any) {
        
    }

  delete(nc: any) {
    
  }

  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }
}
