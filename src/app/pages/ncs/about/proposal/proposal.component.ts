import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  id:number
  
  ngOnInit(): void {
   this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
  }

}
