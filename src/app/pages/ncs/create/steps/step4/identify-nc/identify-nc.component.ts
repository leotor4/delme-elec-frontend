import { Component, OnInit } from '@angular/core';
import {NonComplianceService} from "../../../../../../_services/non-compliance.service";

@Component({
  selector: 'app-identify-nc',
  templateUrl: './identify-nc.component.html',
  styleUrls: ['./identify-nc.component.css']
})
export class IdentifyNCComponent implements OnInit {
  images1= ["imagem1", "imagem2", "imagem3", "imagem4", "imagem5", "imagem1", "imagem2", "imagem3", "imagem4", "imagem5"];
  images2 = ["imagem1", "imagem2", "imagem3", "imagem4", "imagem5", "imagem1", "imagem2", "imagem3", "imagem4", "imagem5"];
    ncID = "001/2022";

  constructor(public nonComplicanceService: NonComplianceService) { }

  ngOnInit(): void {
  }

}
