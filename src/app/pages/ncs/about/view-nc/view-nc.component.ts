import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-nc',
  templateUrl: './view-nc.component.html',
  styleUrls: ['./view-nc.component.css']
})
export class ViewNCComponent implements OnInit {
  ncID = "001/2022";
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  constructor() { }

  ngOnInit(): void {
  }

}
