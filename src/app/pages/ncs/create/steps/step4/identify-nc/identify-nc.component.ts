import { Component, OnInit } from "@angular/core";
import { Attachment } from "src/app/models/attachment";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { NonComplianceService } from "../../../../../../_services/non-compliance.service";
import { DateUtils } from '../../../../../../utils/date-utils';

@Component({
  selector: "app-identify-nc",
  templateUrl: "./identify-nc.component.html",
  styleUrls: ["./identify-nc.component.css"],
})
export class IdentifyNCComponent implements OnInit {


  constructor(
    public nonComplicanceService: NonComplianceService,
    public tokenService: TokenStorageService
  ) {}

  emissor = "";

  returnFile(name: string) {
    let acoesFile: Attachment[] = [];
    this.nonComplicanceService.nc.attachments.forEach((element) => {
      if (element.path == name) {
        acoesFile.push(element);
      }
    });
    return acoesFile;
  }

   ngOnInit(): void{

  }

  formato_brasileiro(data:Date | undefined | null): string {
    const dataFormatada = data ? DateUtils.formato_brasileiro(data) : '00/00/0000';
    return dataFormatada
  }
}
