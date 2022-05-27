import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-nc-info-closing',
  templateUrl: './nc-info-closing.component.html',
  styleUrls: ['./nc-info-closing.component.css']
})
export class NcInfoClosingComponent implements OnInit {
  @Input() nc:any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
