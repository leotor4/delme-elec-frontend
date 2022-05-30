import { Injectable } from '@angular/core';
import {NonComplianceService} from "../../../_services/non-compliance.service";
import {NonCompliance} from "../../../models/non-compliance";
import { HttpClient } from "@angular/common/http";

import {Cost} from "../../../models/Cost";

@Injectable({
    providedIn: 'root'
})
export class AboutService {

    apiUrl = "http://localhost:3333/";

    nc: NonCompliance

    constructor(private ncsService : NonComplianceService, private http: HttpClient) { }

    getNC(id:number){
        this.ncsService.getById(id).subscribe((data: any) => {
            this.nc = data.nc[0]
        })
    }

    updateNC(){
        this.ncsService.updates
    }

    postCost(cost: Cost, file: any) {
        let formData = new FormData();
        formData.append("data", JSON.stringify(cost));
        formData.append("file", file);
        return this.http.post(this.apiUrl + "costs", formData);
    }
    deleteCost(id: number) {
        return this.http.delete(this.apiUrl + "costs/" + id);
    }

    viewFile(id:number){
        return this.http.get<any>(this.apiUrl  + "costs" + "/files/view/"+ id);
    }
    downloadFile(id:number){
        return this.http.get<any>(this.apiUrl  + "costs" + "/files/download/"+ id);
    }

}
