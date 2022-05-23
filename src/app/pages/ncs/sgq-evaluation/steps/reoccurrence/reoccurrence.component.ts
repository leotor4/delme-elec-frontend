import { Component, OnInit } from '@angular/core';
import {SgqService} from "../../sgq.service";
import {DialogService} from "primeng/dynamicdialog";
import {AddNcDialogComponent} from "./add-nc-dialog/add-nc-dialog.component";

@Component({
  selector: 'app-reoccurrence',
  templateUrl: './reoccurrence.component.html',
  styleUrls: ['./reoccurrence.component.css'],
  providers: [DialogService]
})
export class ReoccurrenceComponent implements OnInit {

  constructor(public dialogService: DialogService, public sgqServ: SgqService) { }

  ngOnInit(): void {
    this.sgqServ.getAllNC()
  }

    details(nc: any) {
        
    }

  delete(nc: any) {
    
  }

  parseDate(date:string){
    let d = new Date(Date.parse(date))
    return d.toLocaleDateString();
  }

  openDialog() {
    const ref = this.dialogService.open(AddNcDialogComponent, {
      data: {nc: "xxx.2022"},
      showHeader: false,
      width: '60vw',
    });
    ref.onClose.subscribe((answer: any[])=>{
      if(answer){
        //this.text1= answer
      }
    })
  }
}
