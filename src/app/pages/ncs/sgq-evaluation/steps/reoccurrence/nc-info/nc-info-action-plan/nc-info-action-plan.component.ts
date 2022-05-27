import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nc-info-action-plan',
  templateUrl: './nc-info-action-plan.component.html',
  styleUrls: ['./nc-info-action-plan.component.css']
})
export class NcInfoActionPlanComponent implements OnInit {
  @Input() nc:any = {};
  editorStyle = {
    'height': '120px',
    'width': '200px',
    'border': '2px solid #333333',
    'border-radius': '5px'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
