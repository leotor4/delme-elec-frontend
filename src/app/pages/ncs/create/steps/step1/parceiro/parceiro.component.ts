import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";

import { CustomerService } from "src/app/_services/customer.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { ProviderService } from "src/app/_services/provider.service";
import { SectorService } from "src/app/_services/sector.service";
import { UpdateDateService } from "src/app/_services/update-date.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "app-parceiro",
  templateUrl: "./parceiro.component.html",
  styleUrls: ["./parceiro.component.css"],
})
export class ParceiroComponent implements OnInit {
  constructor(
    public customerService: CustomerService,
    public providerService: ProviderService,
    public updateService: UpdateDateService,
    public nonComplicanceService: NonComplianceService,
    public sectorService: SectorService,
    public translate: TranslateService,
    private messageService: MessageService
  ) {}

  public tiposParceiro: Array<String> = [this.translate.instant("newNC.step1.partner.type1"), this.translate.instant("newNC.step1.partner.type2"), this.translate.instant("newNC.step1.partner.type3")];
  results: any[];
  public display = false;
  label= this.translate.instant("newNC.step1.partner.label1")

  

  search(event: any) {
    var filtro = event.query.normalize('NFKD').replace(/[^\w]/g, '');
    this.results = [];

    if (this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type2")) {
      this.nonComplicanceService.customers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (
      this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type3")
    ) {
      this.nonComplicanceService.providers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type1")) {
      this.nonComplicanceService.sectors.forEach((element) => {
        if (this.verificarExistenciaInterno(element, filtro)) {
          this.results.push(element);
        }
      });
    }
  }

  returnUpdateTime() {
    if (this.nonComplicanceService.updates) {
      let dateAtt = new Date(this.nonComplicanceService.updates.update_time);
      let dateNow = new Date();
      let Difference_In_Time = dateNow.getTime() - dateAtt.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      let round_day = Math.floor(Difference_In_Days);
      if (round_day < 1) {
        return this.translate.instant("newNC.today");
      } else {
        return this.translate.instant("newNC.ago") + round_day + this.translate.instant("newNC.days");
      }
    }
    return "";
  }

  verificarExistencia(element: any, filtro: String): boolean {
    return element.corporate_name?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro?.toUpperCase()) ||
        element.code?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro?.toUpperCase()) ||
        element.responsible_name?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro?.toUpperCase()) ||
        element.responsible_email?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro?.toUpperCase()) ||
        element.responsible_phone?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro?.toUpperCase());
  }

  verificarExistenciaInterno(element: any, filtro: String): boolean {
    return element.name?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro.toUpperCase()) ||
        element.code?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro.toUpperCase()) ||
        element.responsible_name?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro.toUpperCase()) ||
        element.responsible_email?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro.toUpperCase());
  }

  isInterno(): boolean {
    return this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type1");
  }

  onSelected() {
    this.nonComplicanceService.nc.partner =
      this.nonComplicanceService.pesquisar;
    this.nonComplicanceService.editarNomeItem =
      this.nonComplicanceService.nc.partner.responsible_name;
    this.nonComplicanceService.editarTelefoneItem =
      this.nonComplicanceService.nc.partner.responsible_phone;
    this.nonComplicanceService.editarEmailItem =
      this.nonComplicanceService.nc.partner.responsible_email;
  }

  hasSelected(): boolean {
    return this.nonComplicanceService.nc.partner != null;
  }

  onChange() {
    this.nonComplicanceService.pesquisar = "";
    this.nonComplicanceService.nc.partner = null;

    if (this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type1")) {
      
      this.nonComplicanceService.nc.partner = this.translate.instant("newNC.step1.partner.type1")
      this.nonComplicanceService.pesquisar = this.nonComplicanceService.formIdentificacaoNC.value['tipos_local_item']

      this.label= this.translate.instant("newNC.step1.partner.label2")

      for(let element of this.nonComplicanceService.sectors) {    
        if (element.name.toUpperCase() == this.nonComplicanceService.pesquisar.toUpperCase()) {
          
          this.nonComplicanceService.nc.partner = element

          if(element.responsible_name) {
            this.nonComplicanceService.editarNomeItem = element.responsible_name
          }

          if(element.responsible_phone) {
            this.nonComplicanceService.editarTelefoneItem = element.responsible_phone
          }

          if(element.responsible_email) {
            this.nonComplicanceService.editarEmailItem = element.responsible_email
          }
          break;
        }
      }
    } else this.label= this.translate.instant("newNC.step1.partner.label1")
  }

  onChangeAutoComplete() {
    if (this.nonComplicanceService.pesquisar == "") {
      this.nonComplicanceService.nc.partner = null;
    }
  }

  showDialog() {
    this.display = true;
  }
  hideDialog() {
    this.display = false;
  }

  editar() {
    this.nonComplicanceService.nc.partner.responsible_name =
      this.nonComplicanceService.editarNomeItem;
    this.nonComplicanceService.nc.partner.responsible_phone =
      this.nonComplicanceService.editarTelefoneItem;
    this.nonComplicanceService.nc.partner.responsible_email =
      this.nonComplicanceService.editarEmailItem;

    if (this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type2")) {
      this.customerService.put(this.nonComplicanceService.nc.partner).subscribe(
        {
          next:(value) => {
          this.success();
          this.customerService.get().subscribe((data: any) => {
            this.nonComplicanceService.customers = data.customers;
          });
        },
        error:(err) => {
          this.fail();
          this.customerService.get().subscribe((data: any) => {
            this.nonComplicanceService.customers = data.customers;
          });
        }
        }
      );
    } else if (
      this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type3")
    ) {
      this.providerService.put(this.nonComplicanceService.nc.partner).subscribe(
       {
          next:(value) => {
          this.success();
          this.providerService.get().subscribe((data: any) => {
            this.nonComplicanceService.providers = data.providers;
          });
        },
        error:(err) => {
          this.providerService.get().subscribe((data: any) => {
            this.nonComplicanceService.providers = data.providers;
          });
          this.fail();
        }
       }
      );
    } else if (this.nonComplicanceService.nc.tipos_parceiro_item == this.translate.instant("newNC.step1.partner.type1")) {
      this.sectorService.put(this.nonComplicanceService.nc.partner).subscribe(
        {
          next:(value) => {
          this.success();
          this.providerService.get().subscribe((data: any) => {
            this.nonComplicanceService.providers = data.providers;
          });
        },
        error:(err) => {
          this.providerService.get().subscribe((data: any) => {
            this.nonComplicanceService.providers = data.providers;
          });
          this.fail();
        }
        }
      );
    }
  }

  success() {
    this.messageService.add({
      severity: "success",
      summary: this.translate.instant("newNC.step1.partner.success"),
      life: 3000,
    });
    
    this.hideDialog();
  }

  fail() {
    this.messageService.add({
      severity: "error",
      summary: this.translate.instant("newNC.step1.partner.fail"),
      life: 3000,
    });
    this.nonComplicanceService.pesquisar = "";
    this.nonComplicanceService.nc.partner = null;
    this.hideDialog();
  }

  ngOnInit(): void {}
}
