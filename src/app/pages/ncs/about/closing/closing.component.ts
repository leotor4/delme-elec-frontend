import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { FechamentoDialogComponent } from 'src/app/pages/dialogs/fechamento-dialog/fechamento-dialog.component';
import {AboutService} from "../about.service";
import {Closing} from "../../../../models/closing";
import {ActivatedRoute} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-closing',
  templateUrl: './closing.component.html',
  styleUrls: ['./closing.component.css'],providers: [DialogService]
})
export class ClosingComponent implements OnInit {
  isAllOpen = true;
  unselectedClass = "btn btn-outline-dark";
  selectedClass = "btn btn-dark";
  constructor(private dialogService:DialogService,
              public aboutSrv: AboutService,
              private route: ActivatedRoute,
              public translate: TranslateService) { }

  ngOnInit(): void {
  }

  openDialog(){
    const ref = this.dialogService.open(FechamentoDialogComponent,{
      data: {
        id: this.aboutSrv.nc.id
      },
      'header':this.translate.instant("about.closingComponent.header"),
      'width':'700px',
  })

    ref.onClose.subscribe((data: Closing) => {
      if (data) {
        this.aboutSrv.getNC(parseInt(this.route.snapshot.paramMap.get('id')||""))
      }
    });
  }

}
