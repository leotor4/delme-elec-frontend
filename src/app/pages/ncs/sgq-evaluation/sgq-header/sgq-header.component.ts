import { Component, OnInit } from '@angular/core';
import {SgqService} from "../sgq.service";
import {ActivatedRoute} from "@angular/router";
import {MessageService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-sgq-header',
  templateUrl: './sgq-header.component.html',
  styleUrls: ['./sgq-header.component.css']
})
export class SgqHeaderComponent implements OnInit {
    id: number;

  constructor(public sgqServ: SgqService,
              private route: ActivatedRoute,
              private messageService: MessageService,
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
}
