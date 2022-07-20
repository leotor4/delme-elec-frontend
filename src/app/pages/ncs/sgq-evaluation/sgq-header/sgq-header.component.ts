import { Component, OnInit } from '@angular/core';
import {SgqService} from "../sgq.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {DadosNCComponent} from "../../../dialogs/dados-nc/dados-nc.component";
import {DialogService} from "primeng/dynamicdialog";

@Component({
  selector: 'app-sgq-header',
  templateUrl: './sgq-header.component.html',
  styleUrls: ['./sgq-header.component.css'],
  providers: [DialogService]
})
export class SgqHeaderComponent implements OnInit {
    id: number;

  constructor(public sgqServ: SgqService,
              private route: ActivatedRoute,
              private messageService: MessageService,
              public dialogService: DialogService,
              public translate: TranslateService) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')||"")
  }

  salvarSGQ() {
    this.sgqServ.post().subscribe({
      next: data => {
        this.messageService.add({
          severity: "success",
          summary: this.translate.instant("sgq.success"),
          life: 3000,
        });
      },
      error: err => {
        this.messageService.add({
          severity: "error",
          summary: err,
          life: 3000,
        });
      }
    })
  }
  openDados(){
    this.dialogService.open(DadosNCComponent, {
      data: {nc: this.sgqServ.nc},
      width: '1100px',
      closable: true,
      showHeader: false
    });
  }
}
