import { Injectable } from '@angular/core';
import {NonComplianceService} from "../../../_services/non-compliance.service";
import {NonCompliance} from "../../../models/non-compliance";

@Injectable({
    providedIn: 'root'
})
export class AboutService {

    nc: NonCompliance

    constructor(private ncsService : NonComplianceService) { }

    getNC(id:number){
        this.ncsService.getById(id).subscribe((data: any) => {
            this.nc = data.nc
            console.log(this.nc)
        })
    }

}
