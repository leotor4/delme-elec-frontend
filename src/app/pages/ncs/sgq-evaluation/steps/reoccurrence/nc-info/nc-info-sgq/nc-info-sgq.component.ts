import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nc-info-sgq',
  templateUrl: './nc-info-sgq.component.html',
  styleUrls: ['./nc-info-sgq.component.css']
})
export class NcInfoSgqComponent implements OnInit {
  @Input() nc:any = {};
  editorStyle = {
    'width': '100%',
    'border': '0px',
  }
  constructor() { }

  ngOnInit(): void {
  }
  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }
}
