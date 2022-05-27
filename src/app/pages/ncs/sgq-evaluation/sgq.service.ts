import { Injectable } from '@angular/core';
import {NonCompliance} from "../../../models/non-compliance";
import {Contact} from "../../../models/contact.model";
import {NonComplianceService} from "../../../_services/non-compliance.service";
import {HttpClient} from "@angular/common/http";
import {SgqEval} from "../../../models/SgqEval";

@Injectable({
  providedIn: 'root'
})
export class SgqService {

  apiUrl = "http://localhost:3333/sgq";
  allNCs: any[] = []
  sgq = new SgqEval();
  step2File: any = [];
  step5Contacts:any[] = []
  constructor(private ncsService : NonComplianceService, private http: HttpClient) { }

  getAllNC(){
    this.ncsService.get().subscribe((data: any) => {
      this.allNCs = data.noncompliances
    })

  }

  uploadFiles(formData: any) {
    for (let i = 0; i < this.step2File.length; i++) {
      formData.append("fileSGQ[]", this.step2File[i], this.step2File[i].name);
    }
  }

  post() {
    this.sgq.nonCompliance_id = 2
    let formData = new FormData();
    this.uploadFiles(formData);
    console.log(this.sgq.recurrence)
    formData.append("data", JSON.stringify(this.sgq));

    return this.http.post(this.apiUrl, formData)
  }

  put() {
    this.sgq.nonCompliance_id = 1
    let formData = new FormData();
    this.uploadFiles(formData);
    console.log("ID:" + this.sgq.id)
    formData.append("data", JSON.stringify(this.sgq));

    return this.http.put(this.apiUrl+ "/" + this.sgq.id, formData)
  }


  abrirSGQ(){
    let formData = new FormData();
    formData.append('data',"{}")
    return this.http.post(this.apiUrl, formData)
  }
}
