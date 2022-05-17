 import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";

import { CustomerService } from "src/app/_services/customer.service";
import { InstructionsService } from "src/app/_services/instructions.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { PlaceService } from "src/app/_services/place.service";
import { ProcedureService } from "src/app/_services/procedure.service";
import { ProviderService } from "src/app/_services/provider.service";
import { SectorService } from "src/app/_services/sector.service";
import { UpdateDateService } from "src/app/_services/update-date.service";
import { CancelDialogComponent } from "./cancel-dialog/cancel-dialog.component";
 import {NonCompliance} from "../../../../models/non-compliance";

@Component({
  selector: "app-ncs-create-header",
  templateUrl: "./ncs-create-header.component.html",
  styleUrls: ["./ncs-create-header.component.css"],
  providers: [DialogService],
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
    public instructionService: InstructionsService,public dialogService: DialogService,
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
    
    if(this.nonComplianceService.nc.status == "open") this.popularData();
  }

  salvarNc() {
    this.nonComplianceService.put().subscribe({
      next: data => {
        this.messageService.add({
          key: "myKey1",
          severity: "success",
          summary: "Não conformidade salva com sucesso.",
          life: 3000,
        });
        this.nonComplianceService.nc = new NonCompliance()
      },
      error: err => {
        this.messageService.add({
          key: "myKey1",
          severity: "error",
          summary: "Houve um problema ao salvar não conformidade.",
          life: 3000,
        });
        
      }
    });
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

  openCancelDialog(){
    let ref = this.dialogService.open(CancelDialogComponent, {
      data: {
      },
      header: "Cancelar Não conformidade",
      width: "425px",
    })

  }
}
