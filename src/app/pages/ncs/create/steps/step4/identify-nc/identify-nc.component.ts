import { Component, OnInit } from "@angular/core";
import { Attachment } from "src/app/models/attachment";
import { NonComplianceService } from "../../../../../../_services/non-compliance.service";
import { DateUtils } from "../../../../../../utils/date-utils";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-identify-nc",
  templateUrl: "./identify-nc.component.html",
  styleUrls: ["./identify-nc.component.css"],
})
export class IdentifyNCComponent implements OnInit {
  constructor(
    public nonComplicanceService: NonComplianceService,
    public translate: TranslateService
  ) {}

  emissor = "";

  returnTitle(): string {
    if (
      this.nonComplicanceService.nc.tipos_parceiro_item ==
      this.translate.instant("newNC.step1.partner.type1")
    )
      return this.translate.instant("newNC.review.sector");
    return this.translate.instant("newNC.review.corporateName");
  }

  formato_brasileiro(data: Date | undefined | null): string {
    return data ? DateUtils.formato_brasileiro(data) : "00/00/0000";
  }

  haveSegment(): boolean {
    if (this.nonComplicanceService.nc.tipos_auditoria_item) {
      return true;
    }
    return false;
  }

  

  ngOnInit(): void {}
}
