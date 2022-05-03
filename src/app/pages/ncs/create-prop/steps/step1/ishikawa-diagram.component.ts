import { Component, OnInit } from '@angular/core';
import {DialogService} from 'primeng/dynamicdialog';
import {IshikawaDialogComponent} from "./ishikawa-dialog/ishikawa-dialog.component";

@Component({
  selector: 'app-ishikawa-diagram',
  templateUrl: './ishikawa-diagram.component.html',
  styleUrls: ['./ishikawa-diagram.component.css'],
  providers: [DialogService]
})
export class IshikawaDiagramComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }


  openDialog(page:number) {
    const ref = this.dialogService.open(IshikawaDialogComponent, {
      data: {page: page},
      width: '901px',
      closable: false,
      showHeader: false
    });
  }
}
