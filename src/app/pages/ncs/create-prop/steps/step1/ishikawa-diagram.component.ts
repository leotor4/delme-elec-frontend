import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {IshikawaDialogComponent} from "./ishikawa-dialog/ishikawa-dialog.component";
import {ProposalService} from "../../proposal.service";


@Component({
  selector: 'app-ishikawa-diagram',
  templateUrl: './ishikawa-diagram.component.html',
  styleUrls: ['./ishikawa-diagram.component.css'],
  providers: [DialogService]
})
export class IshikawaDiagramComponent implements OnInit {
  text1: any;
  editorStyle = {
    'height':'120px',
    'width':'260px',
    'border': '2px solid #333333',
    'border-radius': '5px',
    'background-color': '#333333'
    
  }
    displayModal: boolean = false;

  constructor(public dialogService: DialogService, public propService: ProposalService) { }

  ngOnInit(): void {
    
   
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }


  openDialog(page:number) {
    const ref = this.dialogService.open(IshikawaDialogComponent, {
      data: {page: page},
      width: '901px',
    });
    ref.onClose.subscribe((answer: any[])=>{
      if(answer){
        this.text1= answer

      }
    })
  }

  returnString(obj: any) {
    let str = ''
    if (obj?.name) return obj.name + " ";
    if (obj?.code) str += obj.code + " ";
    if (obj?.description) str += obj.description + " ";
    if (obj?.rev) str += obj.rev + " ";
    return str
  }
  showDescriptionDialog() {
    this.displayModal = true;
  }
}
