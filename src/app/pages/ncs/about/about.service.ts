import { Injectable } from "@angular/core";
import { NonComplianceService } from "../../../_services/non-compliance.service";
import { NonCompliance } from "../../../models/non-compliance";
import { ProposalSolution } from "../../../models/proposal-solution";
import { HttpClient } from "@angular/common/http";
import { Cost } from "../../../models/Cost";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AboutService {
  displayPdf = false;
  apiUrl = environment.apiURL;
  isLoad = false;

  nc: NonCompliance;
  proposalSolution: ProposalSolution;

  constructor(
    private ncsService: NonComplianceService,
    private http: HttpClient
  ) {}

  hasProposal(): boolean {
    if (!this.nc) return false;
    if (this.nc.proposalSolution) return true;
    return false;
  }

  hasSgqEval(): boolean {
    if (!this.nc) return false;
    if (this.nc.sgqEvaluation) return true;
    return false;
  }

  getNC(id: number) {
    this.ncsService.getById(id).subscribe((data: any) => {
      this.nc = data.nc[0];
      let proposal = this.nc.proposalSolution;
      if (proposal) {
        proposal.lack_materials = proposal.lack_materials ?? "";
        proposal.excess_materials = proposal.excess_materials ?? "";
        proposal.low_quality_materials = proposal.low_quality_materials ?? "";
        proposal.material_description = proposal.material_description ?? "";
        proposal.lack_parameters = proposal.lack_parameters ?? "";
        proposal.excess_parameters = proposal.excess_parameters ?? "";
        proposal.non_achievement_goals = proposal.non_achievement_goals ?? "";
        proposal.measurement_description =
          proposal.measurement_description ?? "";
        proposal.method_description = proposal.method_description ?? "";
        proposal.run_training = proposal.run_training ?? "";
        proposal.man_power_description = proposal.man_power_description ?? "";
        proposal.environment_description =
          proposal.environment_description ?? "";
        proposal.machine_description = proposal.machine_description ?? "";
        proposal.effect_description = proposal.effect_description ?? "";
      }
     
      
      this.isLoad = true;
    });
  }

  updateNC() {
    this.ncsService.updates;
  }

  postCost(cost: Cost, file: any) {
    let formData = new FormData();
    formData.append("data", JSON.stringify(cost));
    for (var i = 0; i < file.length; i++) {
      formData.append("files", file[i]);
    }

    return this.http.post(this.apiUrl + "costs", formData);
  }
  deleteCost(id: number) {
    return this.http.delete(this.apiUrl + "costs/" + id);
  }

  viewFile(id: number) {
    return this.http.get<any>(this.apiUrl + "costs" + "/files/view/" + id);
  }
  downloadFile(id: number) {
    return this.http.get<any>(this.apiUrl + "costs" + "/files/download/" + id);
  }
}
