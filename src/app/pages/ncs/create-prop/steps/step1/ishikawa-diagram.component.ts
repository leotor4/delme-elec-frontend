import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {IshikawaDialogComponent} from "./ishikawa-dialog/ishikawa-dialog.component";
import {ProposalService} from "../../proposal.service";
import Quill from 'quill';

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
    'border-radius': '5px'
  }

  constructor(public dialogService: DialogService, public propService: ProposalService) { }

  ngOnInit(): void {
  }


  openDialog(page:number) {
    const ref = this.dialogService.open(IshikawaDialogComponent, {
      data: {page: page},
      width: '901px',
      closable: false,
      showHeader: false
    });
    ref.onClose.subscribe((answer: any[])=>{
      if(answer){
        this.text1= answer
      }
    })
  }
}
