import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AboutService } from '../about.service';



@Component({
  selector: 'app-proposal',
  templateUrl: './proposal.component.html',
  styleUrls: ['./proposal.component.css']
})
export class ProposalComponent implements OnInit {

  constructor(private route: ActivatedRoute,public aboutService:AboutService) { }
  id:number
    ncID = "001/2022";
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  editorStyle = {
    'height': '120px',
    'width': '260px',
    'border': '2px solid #333333',
    'border-radius': '5px'
  }
  
  ngOnInit(): void {
   this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
   
   
  }

}
