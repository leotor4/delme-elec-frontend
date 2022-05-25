import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nc-infor-view-nc',
  templateUrl: './nc-infor-view-nc.component.html',
  styleUrls: ['./nc-infor-view-nc.component.css']
})
export class NcInforViewNcComponent implements OnInit {
  @Input() nc:any = {};
  constructor() { }

  ngOnInit(): void {
  }

  isType1(element:any) {
    return element.path=="evidenciasNc";
  }
  isType2(element:any) {
    return element.path=="evidenciasAcoes";
  }
  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }

}
