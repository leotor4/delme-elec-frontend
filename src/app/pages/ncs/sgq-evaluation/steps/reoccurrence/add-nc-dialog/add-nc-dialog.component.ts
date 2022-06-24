import {Component, OnInit, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {SgqService} from "../../../sgq.service";
import {Contact} from "../../../../../../models/contact.model";
import {NonCompliance} from "../../../../../../models/non-compliance";
import {Table} from "primeng/table";

@Component({
  selector: 'app-add-nc-dialog',
  templateUrl: './add-nc-dialog.component.html',
  styleUrls: ['./add-nc-dialog.component.css']
})
export class AddNcDialogComponent implements OnInit {
  @ViewChild('dt1') dt: Table;
  ncCode = ""
  selected: any[]
  ncs: any[]
  constructor(public ref: DynamicDialogRef,
              public config: DynamicDialogConfig,
              public sgqServ: SgqService) { }

  ngOnInit(): void {
    this.ncCode = this.config.data.nc
    this.selected = this.config.data.selected
    this.ncs = this.sgqServ.allNCs.filter(
        (val) => {
          return !(this.selected.some(e => e.id == val.id))
        }
    );
  }

  closeDialog() {
    this.ref.close(this.selected)
  }
  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
