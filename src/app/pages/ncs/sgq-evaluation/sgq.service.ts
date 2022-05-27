import { Injectable } from '@angular/core';
import {NonCompliance} from "../../../models/non-compliance";
import {Contact} from "../../../models/contact.model";
import {NonComplianceService} from "../../../_services/non-compliance.service";

@Injectable({
  providedIn: 'root'
})
export class SgqService {

  constructor(private ncsService : NonComplianceService) { }
  allNCs: any[] = []
  step1: any[] = []

  step2Text = ""
  step2File: any = []

  step3Text = ""

  step4Text = ""

  step5Contacts: Contact[] = []
  getAllNC(){
    this.ncsService.get().subscribe((data: any) => {
      this.allNCs = data.noncompliances
    })

  }
}
