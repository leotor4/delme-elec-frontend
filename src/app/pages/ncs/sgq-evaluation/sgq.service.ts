import { Injectable } from '@angular/core';
import {NonCompliance} from "../../../models/non-compliance";
import {Contact} from "../../../models/contact.model";
import {NonComplianceService} from "../../../_services/non-compliance.service";
import {HttpClient} from "@angular/common/http";
import {SgqEval} from "../../../models/SgqEval";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SgqService {

  apiUrl = environment.apiURL+"sgq";
  allNCs: any[] = []
  sgq = new SgqEval();
  step2File: any = [];
  nc: NonCompliance;
  constructor(private ncsService : NonComplianceService, private http: HttpClient) { }

  getRecurrence(): Observable<NonCompliance[]> {
    return this.http.get<NonCompliance[]>(environment.apiURL+"recidivisms/getSimilar");
  }

  uploadFiles(formData: any) {
    for (let i = 0; i < this.step2File.length; i++) {
      formData.append("fileSGQ[]", this.step2File[i], this.step2File[i].name);
    }
  }

  post() {
    let formData = new FormData();
    this.uploadFiles(formData);
    console.log(this.sgq.recurrence)
    formData.append("data", JSON.stringify(this.sgq));

    return this.http.post(this.apiUrl, formData)
  }

  put() {
    let formData = new FormData();
    this.uploadFiles(formData);
    console.log("ID:" + this.sgq.id)
    formData.append("data", JSON.stringify(this.sgq));

    return this.http.put(this.apiUrl+ "/" + this.sgq.id, formData)
  }


  abrirSGQ(id: number){
    let formData = new FormData();
    // @ts-ignore
    formData.append('Ncid',id)
    return this.http.post(this.apiUrl, formData)
  }

  avancarPasso1(): boolean {
    return !(this.sgq.text_area1
     
    )
  }

  avancarPasso2(): boolean {
    return !(
        this.sgq.text_area2
        && this.sgq.text_area3
    );
  }
}
