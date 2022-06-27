import { Component, OnInit } from '@angular/core';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import { ActivatedRoute } from '@angular/router';
import {AboutService} from "./about.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private ncsService : NonComplianceService, private route: ActivatedRoute, private aboutSrvc: AboutService) { }
 
  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get('id')||"")
    this.aboutSrvc.getNC(id)
  }

    test() {
        console.log("test")
    }
}
