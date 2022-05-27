import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FechamentoDialogComponent } from 'src/app/pages/dialogs/fechamento-dialog/fechamento-dialog.component';

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.css'],providers: [DialogService]
})
export class ClosingComponent implements OnInit {

  constructor(private dialogService:DialogService) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialogService.open(FechamentoDialogComponent,{
      'header':"Verificação de Eficácia.",
      'width':'700px',
  })
  }

}
