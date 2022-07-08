import { RoleGuardService } from './../../../_services/role-guard.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Component, OnInit } from '@angular/core';
import { NonComplianceService } from 'src/app/_services/non-compliance.service';
import { ActivatedRoute, Router } from '@angular/router';
import {AboutService} from "./about.service";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(
    private ncsService: NonComplianceService,
    private route: ActivatedRoute,
    public aboutSrvc: AboutService,
    private router: Router,
    private tokenService : TokenStorageService,
    public roleService : RoleGuardService 
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    this.aboutSrvc.getNC(id);
  }

  goCreateProp(e: any) {
     let id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    if (e["index"] == 1 && !this.aboutSrvc.hasProposal()) {
      this.router.navigate(["/", "ncs", "createProp", id]);
    }
    console.log(this.aboutSrvc.nc?.proposalSolution)
    if (e["index"] == 3 && this.aboutSrvc.nc?.proposalSolution && this.aboutSrvc.nc?.costs?.length>0 && !this.aboutSrvc.nc?.sgqEvaluation) {
      this.router.navigate(["/", "ncs", "sgq", id]);
    }
  }


  checkRoleProposal (): boolean {
    var user = this.tokenService.getUser()
    
    if (user['email'] == this.aboutSrvc.nc.sector?.responsible_email || user['role_id'] == 3) {
      return false;
    } 

    return true;
  }
}
