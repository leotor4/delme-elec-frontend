import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";

import { CustomerService } from "src/app/_services/customer.service";
import { InstructionsService } from "src/app/_services/instructions.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { PlaceService } from "src/app/_services/place.service";
import { ProcedureService } from "src/app/_services/procedure.service";
import { ProviderService } from "src/app/_services/provider.service";
import { SectorService } from "src/app/_services/sector.service";
import { UpdateDateService } from "src/app/_services/update-date.service";

@Component({
  selector: "app-ncs-create-header",
  templateUrl: "./ncs-create-header.component.html",
  styleUrls: ["./ncs-create-header.component.css"],
})
export class NcsCreateHeaderComponent implements OnInit {
  constructor(
    public nonComplianceService: NonComplianceService,
    public customerService: CustomerService,
    public updateService: UpdateDateService,
    public sectorService: SectorService,
    public providerService: ProviderService,
    public placeService: PlaceService,
    public procedureService: ProcedureService,
    private messageService: MessageService,
    public instructionService: InstructionsService
  ) {}

  ngOnInit(): void {
    this.customerService.get().subscribe((data: any) => {
      this.nonComplianceService.customers = data.customers;
    });

    this.updateService.get().subscribe((data: any) => {
      this.nonComplianceService.updates = data.Updatedate[0];
    });

    this.sectorService.get().subscribe((data: any) => {
      this.nonComplianceService.sectors = data.sectors;
    });

    this.providerService.get().subscribe((data: any) => {
      this.nonComplianceService.providers = data.providers;
    });

    this.placeService.get().subscribe((data: any) => {
      this.nonComplianceService.places = data.places;
    });

    this.procedureService.get().subscribe((data: any) => {
      console.log(data.procedures);
      this.nonComplianceService.procedures = data.procedures;
    });

    this.instructionService.get().subscribe((data: any) => {
      console.log(data.instructions);
      this.nonComplianceService.instructions = data.instructions;
    });

    this.nonComplianceService.get().subscribe((data: any) => {
      this.nonComplianceService.ncs = data.noncompliances;
    });

    this.popularData();
  }

  salvarNc() {
    this.nonComplianceService.post(this.messageService);
  }

  popularData() {
    let now = new Date();
    let late = new Date();
    late.setDate(now.getDate() + 30);
    this.nonComplianceService.nc.data_abertura = now.toISOString().slice(0, 10);

    this.nonComplianceService.nc.data_fechamento = late
      .toISOString()
      .slice(0, 10);
  }
}
