import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SgqService} from "../../../sgq.service";

@Component({
  selector: 'app-nc-info',
  templateUrl: './nc-info.component.html',
  styleUrls: ['./nc-info.component.css']
})
export class NcInfoComponent implements OnInit {

  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public sgqServ: SgqService) { }

  ngOnInit(): void {
  }

}
