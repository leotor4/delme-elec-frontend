import {Component, Input, OnInit} from '@angular/core';
import {AboutService} from "../about.service";

@Component({
  selector: 'app-about-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  item = '';
  constructor(public aboutSrvc: AboutService) { }

  ngOnInit(): void {
  }

}
