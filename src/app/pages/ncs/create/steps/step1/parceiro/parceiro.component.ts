import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";

import { CustomerService } from "src/app/_services/customer.service";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { ProviderService } from "src/app/_services/provider.service";
import { SectorService } from "src/app/_services/sector.service";
import { UpdateDateService } from "src/app/_services/update-date.service";

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

    private messageService: MessageService
  ) {}

  public tiposParceiro: Array<String> = ["Interno", "Cliente", "Fornecedor"];
  results: any[];
  public parceiroIdent = false;
  public display = false;
  label= 'Busque por SAP, razão social ou contato...'

  

  search(event: any) {
    var filtro = event.query.normalize('NFKD').replace(/[^\w]/g, '');
    this.results = [];

    if (this.nonComplicanceService.nc.tipos_parceiro_item == "Cliente") {
      this.nonComplicanceService.customers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (
      this.nonComplicanceService.nc.tipos_parceiro_item == "Fornecedor"
    ) {
      this.nonComplicanceService.providers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (this.nonComplicanceService.nc.tipos_parceiro_item == "Interno") {
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
      var Difference_In_Time = dateNow.getTime() - dateAtt.getTime();
      var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      var round_day = Math.floor(Difference_In_Days);
      if (round_day < 1) {
        return "Hoje";
      } else {
        return "Há " + round_day + " dias.";
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
    if (this.nonComplicanceService.nc.tipos_parceiro_item == "Interno") {
      return true;
    } else {
      return false;
    }
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
    if (this.nonComplicanceService.nc.partner != null) {
      return true;
    }
    return false;
  }

  onChange() {
    this.nonComplicanceService.pesquisar = "";
    this.nonComplicanceService.nc.partner = null;

    if (this.nonComplicanceService.nc.tipos_parceiro_item == 'Interno') {
      
      this.nonComplicanceService.nc.partner = 'Interno'
      this.nonComplicanceService.pesquisar = this.nonComplicanceService.formIdentificacaoNC.value['tipos_local_item']

      console.log(this.nonComplicanceService.nc)
      this.label= 'Busque por nome do setor ou responsável...'

      for(let element of this.nonComplicanceService.sectors) {    
        if (element.name.toUpperCase() == this.nonComplicanceService.pesquisar.toUpperCase()) {
          
          console.log(this.nonComplicanceService.pesquisar)
          console.log(element)
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
    } else this.label= 'Busque por SAP, razão social ou contato...'
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

    if (this.nonComplicanceService.nc.tipos_parceiro_item == "Cliente") {
      this.customerService.put(this.nonComplicanceService.nc.partner).subscribe(
        {
          next:(value) => {
          this.sucess();
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
      this.nonComplicanceService.nc.tipos_parceiro_item == "Fornecedor"
    ) {
      this.providerService.put(this.nonComplicanceService.nc.partner).subscribe(
       {
          next:(value) => {
          this.sucess();
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
    } else if (this.nonComplicanceService.nc.tipos_parceiro_item == "Interno") {
      this.sectorService.put(this.nonComplicanceService.nc.partner).subscribe(
        {
          next:(value) => {
          this.sucess();
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

  sucess() {
    this.messageService.add({
      severity: "success",
      summary: "Dados editados com sucesso.",
      life: 3000,
    });
    
    this.hideDialog();
  }

  fail() {
    this.messageService.add({
      severity: "error",
      summary: "Houve um problema ao editar os dados.",
      life: 3000,
    });
    this.nonComplicanceService.pesquisar = "";
    this.nonComplicanceService.nc.partner = null;
    this.hideDialog();
  }

  ngOnInit(): void {}
}
