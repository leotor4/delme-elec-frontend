import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "primeng/api";
import { NonCompliance } from "src/app/models/non-compliance";
import { ProposalSolution } from "src/app/models/proposal-solution";
import { EquipamentService } from "src/app/_services/equipament.service";
import { InstructionsService } from "src/app/_services/instructions.service";
import { MachineService } from "src/app/_services/machine.service";
import { NbrNormService } from "src/app/_services/nbr-norm.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";

import { ProcedureService } from "src/app/_services/procedure.service";
import { RegulatoryNormService } from "src/app/_services/regulatory-norm.service";
import { UserService } from "src/app/_services/user.service";
import { AboutService } from "../about/about.service";
import { ProposalService } from "./proposal.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-create-prop",
  templateUrl: "./create-prop.component.html",
  styleUrls: ["./create-prop.component.css"],
})
export class CreatePropComponent implements OnInit {
  constructor(
    private ncService: NonComplianceService,
    private aboutService: AboutService,
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    public propService: ProposalService,
    public equipService: EquipamentService,
    public regulatoryService: RegulatoryNormService,
    public instructionService: InstructionsService,
    public procedureService: ProcedureService,
    public machineService: MachineService,
    public nbrService: NbrNormService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    let id = parseInt(this.route.snapshot.paramMap.get("id") || "");

    this.propService.propSolution.non_compliance_id = id;

    this.ncService.getById(id).subscribe({
      next: (data: any) => {
        this.propService.ncProp = data.nc[0];
          if (this.propService.ncProp.proposalSolution) {
            this.propService.propSolution =
              this.propService.ncProp.proposalSolution;
              this.propService.popularForm();
          } else {
            this.propService.post().subscribe({
              next: (data: any) => {
                this.propService.propSolution.id = data["proposta"]["id"];
                this.messageService.add({
                  severity: "success",
                  summary: this.translate.instant("createProp.success"),
                  life: 3000,
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: "error",
                  summary: this.translate.instant("createProp.fail1"),
                  life: 3000,
                });
              },
            });
          }
        
      },error:(err)=>{
         this.messageService.add({
           severity: "error",
           summary: this.translate.instant("createProp.fail2"),
           life: 3000,
         });
      }
    });

  

    this.equipService.get().subscribe({
      next: (data) => {
        this.propService.equipaments = data.equipament;
      },
    });

    this.instructionService.get().subscribe({
      next: (data: any) => {
        this.propService.instructions = data.instructions;
      },
    });

    this.machineService.get().subscribe({
      next: (data: any) => {
        this.propService.machines = data.machine;
      },
    });

    this.procedureService.get().subscribe({
      next: (data: any) => {
        this.propService.procedures = data.procedures;
      },
    });

    this.regulatoryService.get().subscribe({
      next: (data: any) => {
        this.propService.regulatorys = data.regulatoryNorm;
      },
    });

    this.nbrService.get().subscribe({
      next: (data: any) => {
        this.propService.nbrs = data.nbrs;
      },
    });

    this.userService.getAll().subscribe({
      next: (data: any) => {
        this.propService.users = data.users;
      },
    });
  }

  ngOnDestroy(): void {}
}
