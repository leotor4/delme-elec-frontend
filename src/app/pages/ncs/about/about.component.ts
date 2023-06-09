import { RoleGuardService } from "./../../../_services/role-guard.service";
import { TokenStorageService } from "src/app/_services/token-storage.service";
import { Component, OnInit } from "@angular/core";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AboutService } from "./about.service";

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
    private tokenService: TokenStorageService,
    public roleService: RoleGuardService
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    this.aboutSrvc.getNC(id);
  }

  ngOnDestroy(): void {
    this.aboutSrvc.isLoad = false;
  }

  goCreateProp(e: any) {
    let id = parseInt(this.route.snapshot.paramMap.get("id") || "");
    if (e["index"] == 1 && !this.aboutSrvc.hasProposal()) {
      this.router.navigate(["/", "ncs", "createProp", id]);
    }
    console.log(this.aboutSrvc.nc?.proposalSolution);
    if (
      e["index"] == 3 &&
      this.aboutSrvc.nc?.proposalSolution &&
      !this.aboutSrvc.nc?.sgqEvaluation
    ) {
      this.router.navigate(["/", "ncs", "sgq", id]);
    }
  }

  checkDisableProposal(): boolean {
    var disabled = true;
    var setorResponsible = this.aboutSrvc.nc?.sector?.responsible_email??"";
    console.log(setorResponsible);
    
      if (
        this.roleService.isResponsibleOrManager(setorResponsible) ||
        this.isActionPlanResponsible()
      ) {
        disabled = false;
      }
    

    return disabled;
  }

  isActionPlanResponsible(): boolean {
    var user = this.tokenService.getUser();

    var listActionPlan = this.aboutSrvc.nc.proposalSolution?.actionPlans;

    if (listActionPlan) {
      for (var i = 0; i < listActionPlan?.length; i++) {
        var actionPlanResponsibleEmail = listActionPlan[i].responsible;

        if (actionPlanResponsibleEmail) {
          if (actionPlanResponsibleEmail == user["email"]) return true;
        }
      }
    }

    return false;
  }

  checkDisableCosts(): boolean {
    var disabled = true;
    let teste = false;

    if (this.aboutSrvc.hasProposal() && this.roleService.isFiscalOrManager()) {
      let proposta = this.aboutSrvc.nc.proposalSolution;
      if (proposta?.status == "complete") {
        disabled = false;
      }
    }

    return disabled;
  }

  checkDisableSgqEval(): boolean {
    var disabled = true;

    if (this.aboutSrvc.hasProposal() && this.roleService.isManager()) {
      let proposta = this.aboutSrvc.nc.proposalSolution;

      if (proposta?.status == "complete") {
        disabled = false;
      }
    }
    return disabled;
  }

  checkDisableClose(): boolean {
    var disabled = true;

    if (
      this.aboutSrvc.hasProposal() &&
      this.aboutSrvc.hasSgqEval() &&
      this.roleService.isManager()
    ) {
      let sgq = this.aboutSrvc.nc.sgqEvaluation;
      if (sgq.text_area1 && sgq.text_area2 && sgq.text_area3) {
        disabled = false;
      }
    }
    return disabled;
  }
}
