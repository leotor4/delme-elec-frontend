import { Component, OnInit } from '@angular/core';
import {AboutService} from "../about.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sgq-evaluation',
  templateUrl: './sgq-evaluation.component.html',
  styleUrls: ['./sgq-evaluation.component.css']
})
export class SGQEvaluationComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, public aboutSrv: AboutService) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
  }

}
