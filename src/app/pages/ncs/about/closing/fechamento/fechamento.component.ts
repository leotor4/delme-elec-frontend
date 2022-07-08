import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Closing } from 'src/app/models/closing';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import { AboutService } from '../../about.service';
import { ClosingService } from '../closing.service';

@Component({
  selector: "app-fechamento",
  templateUrl: "./fechamento.component.html",
  styleUrls: ["./fechamento.component.css"],
})
export class FechamentoComponent implements OnInit {
  closing = new Closing();
  constructor(
    public aboutSrv: AboutService,
    private route: ActivatedRoute,
    public cServ: ClosingService,
    private messageService: MessageService,
    private router: Router,

    public ncService: NonComplianceService,

    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.radioValue = "sim"
  }
  radioValue: string;
  editorValue = "";

  save() {
    
    this.closing.nonCompliance_id = parseInt(
      this.route.snapshot.paramMap.get("id")!
    );
    this.closing.comment = this.editorValue;
    this.ncService.closeNc(this.closing.nonCompliance_id).subscribe({
      next: (data) => {
        this.cServ.post(this.closing).subscribe({
          next: (data) => {
            this.messageService.add({
              severity: "success",
              summary: this.translate.instant("closeNC.success"),
              life: 3000,
            });
           this.router.navigate(["/", "ncs"]);
          },
          error: (error) => {
            this.messageService.add({
              severity: "error",
              summary: error,
              life: 3000,
            });
          },
        });
      },
      error: (err) => {},
    });
  }
}
