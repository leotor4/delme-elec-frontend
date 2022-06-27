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
    private aboutSrvc: AboutService,
    private router: Router
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
    if (e["index"] == 3 && (this.aboutSrvc.nc?.proposalSolution && this.aboutSrvc.nc?.costs?.length>0)) {
      this.router.navigate(["/", "ncs", "sgq", id]);
    }
  }
}
