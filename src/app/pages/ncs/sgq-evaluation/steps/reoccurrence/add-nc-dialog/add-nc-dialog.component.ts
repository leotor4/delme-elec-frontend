import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SgqService} from "../../../sgq.service";

@Component({
  selector: 'app-add-nc-dialog',
  templateUrl: './add-nc-dialog.component.html',
  styleUrls: ['./add-nc-dialog.component.css']
})
export class AddNcDialogComponent implements OnInit {
  ncCode = ""
  selected: any[]
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public sgqServ: SgqService) { }

  ngOnInit(): void {
    this.ncCode = this.config.data.nc
    console.log(this.ncCode)
  }

  closeDialog() {
    console.log(this.selected)
    this.ref.close()
  }
  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }
}
