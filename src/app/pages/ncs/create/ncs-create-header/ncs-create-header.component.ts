import { ObjectUtils } from './../../../../utils/object-utils';
import { Place } from 'src/app/models/place';
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
import { ActivatedRoute, Router } from "@angular/router";

import momentImported from 'moment';
import {TranslateService} from "@ngx-translate/core";
const moment = momentImported;

@Component({
  selector: "app-ncs-create-header",
  templateUrl: "./ncs-create-header.component.html",
  styleUrls: ["./ncs-create-header.component.css"],
  providers: [DialogService],
})
export class NcsCreateHeaderComponent implements OnInit {
  
  places:Array<string>[]

  constructor(
    public nonComplianceService: NonComplianceService,
    public customerService: CustomerService,
    public updateService: UpdateDateService,
    public sectorService: SectorService,
    public providerService: ProviderService,
    public placeService: PlaceService,
    public procedureService: ProcedureService,
    private messageService: MessageService,
    public instructionService: InstructionsService,
    public dialogService: DialogService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService
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

    // this.placeService.get().subscribe((data: any) => {
    //   this.nonComplianceService.places = data.places.map(
    //     (item:Place) =>
    //       item.name
    //     );


    //   console.log('data places = ', this.nonComplianceService.places)

    // });

    let data = this.activatedRoute.snapshot.data
    
    const teste:Array<Place> = ObjectUtils.buscarValor(data, 'places.places', '')
    
    this.nonComplianceService.places = teste.map(
      (item:Place) => item.name
    );

    this.providerService.get().subscribe((data: any) => {
      this.nonComplianceService.providers = data.providers;
    });

    this.procedureService.get().subscribe((data: any) => {
      this.nonComplianceService.procedures = data.procedures;
    });

    this.instructionService.get().subscribe((data: any) => {
      this.nonComplianceService.instructions = data.instructions;
    });

    this.nonComplianceService.get().subscribe((data: any) => {
      this.nonComplianceService.ncs = data.noncompliances;
    });
    
    if(this.nonComplianceService.nc.status == "open") this.popularData();
  }

  salvarNc(btnType:string) {
    this.nonComplianceService.put().subscribe({
      next: data => {
        this.messageService.add({
          severity: "success",
          summary: this.translate.instant("newNC.success"),
          life: 3000,
        });

        if (btnType == 'home') {
          this.router.navigate(["/ncs/"])
        }
      },
      error: err => {
        this.messageService.add({
          severity: "error",
          summary: this.translate.instant("newNC.fail"),
          life: 3000,
        });
        
        if (btnType == 'home') {
          this.router.navigate(["/ncs/"])
          this.nonComplianceService.msgHome = this.translate.instant("newNC.failToSave")
          this.nonComplianceService.typeMsgHome = 'error'
        }
      }
    });
  }

  popularData() {
    this.nonComplianceService.nc.data_abertura = moment(new Date()).toDate(); 
    this.nonComplianceService.nc.data_fechamento = moment(new Date()).add(30).toDate()
  }

  openCancelDialog(){
    let ref = this.dialogService.open(CancelDialogComponent, {
      data: {
      },
      header: this.translate.instant("newNC.cancelNC"),
      width: "425px",
    })

  }
}
