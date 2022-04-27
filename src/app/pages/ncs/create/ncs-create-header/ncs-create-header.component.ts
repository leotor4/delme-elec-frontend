import { Component, OnInit } from "@angular/core";
import { CustomerService } from "src/app/_services/customer.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { PlaceService } from "src/app/_services/place.service";
import { ProviderService } from "src/app/_services/provider.service";
import { SectorService } from "src/app/_services/sector.service";
import { UpdateDateService } from "src/app/_services/update-date.service";
import { ContactsService } from "../steps/step3/contacts.service";

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
    public placeService: PlaceService
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
  }

  teste() {
    this.nonComplianceService.post();
  }
}
