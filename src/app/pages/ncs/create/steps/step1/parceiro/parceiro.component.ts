import { Component, OnInit } from "@angular/core";
import { MessageService } from "primeng/api";

import { elementAt } from "rxjs";
import { Customer } from "src/app/models/customer";
import { Provider } from "src/app/models/provider";
import { Sector } from "src/app/models/sector";
import { UpdateDate } from "src/app/models/update-date";
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

  public editarNomeItem = "";
  public editarEmailItem = "";
  public editarTelefoneItem = "";

  search(event: any) {
    var filtro = event.query;
    this.results = [];

    if (this.nonComplicanceService.nc.tiposParceiroItem == "Cliente") {
      this.nonComplicanceService.customers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (
      this.nonComplicanceService.nc.tiposParceiroItem == "Fornecedor"
    ) {
      this.nonComplicanceService.providers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (this.nonComplicanceService.nc.tiposParceiroItem == "Interno") {
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
    if (
      element.corporate_name?.toUpperCase().includes(filtro.toUpperCase()) ||
      element.code?.toUpperCase().includes(filtro.toUpperCase()) ||
      element.responsible_name?.toUpperCase().includes(filtro.toUpperCase()) ||
      element.responsible_email?.toUpperCase().includes(filtro.toUpperCase()) ||
      element.responsible_phone?.toUpperCase().includes(filtro.toUpperCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  verificarExistenciaInterno(element: any, filtro: String): boolean {
    if (
      element.name?.toUpperCase().includes(filtro.toUpperCase()) ||
      element.code?.toUpperCase().includes(filtro.toUpperCase())
    ) {
      return true;
    } else {
      return false;
    }
  }

  isInterno(): boolean {
    if (this.nonComplicanceService.nc.tiposParceiroItem == "Interno") {
      return true;
    } else {
      return false;
    }
  }

  onSelected() {
    this.nonComplicanceService.selected = this.nonComplicanceService.pesquisar;
    this.editarNomeItem = this.nonComplicanceService.selected.responsible_name;
    this.editarTelefoneItem =
      this.nonComplicanceService.selected.responsible_phone;
    this.editarEmailItem =
      this.nonComplicanceService.selected.responsible_email;
    this.nonComplicanceService.isSelected = true;
  }

  onChange() {
    this.nonComplicanceService.pesquisar = "";
    this.nonComplicanceService.isSelected = false;
  }

  onChangeAutoComplete() {
    if (this.nonComplicanceService.pesquisar == "") {
      this.nonComplicanceService.isSelected = false;
    }
  }

  showDialog() {
    this.display = true;
  }
  hideDialog() {
    this.display = false;
  }

  editar() {
    this.nonComplicanceService.selected.responsible_name = this.editarNomeItem;
    this.nonComplicanceService.selected.responsible_phone =
      this.editarTelefoneItem;
    this.nonComplicanceService.selected.responsible_email =
      this.editarEmailItem;

    if (this.nonComplicanceService.nc.tiposParceiroItem == "Cliente") {
      this.customerService.put(this.nonComplicanceService.selected).subscribe(
        (value) => {
          this.sucess();
          this.customerService.get().subscribe((data: any) => {
            this.nonComplicanceService.customers = data.customers;
          });
        },
        (err) => {
          this.fail();
          this.customerService.get().subscribe((data: any) => {
            this.nonComplicanceService.customers = data.customers;
          });
        }
      );
    } else if (
      this.nonComplicanceService.nc.tiposParceiroItem == "Fornecedor"
    ) {
      this.providerService.put(this.nonComplicanceService.selected).subscribe(
        (value) => {
          this.sucess();
          this.providerService.get().subscribe((data: any) => {
            this.nonComplicanceService.providers = data.providers;
          });
        },
        (err) => {
          this.providerService.get().subscribe((data: any) => {
            this.nonComplicanceService.providers = data.providers;
          });
          this.fail();
        }
      );
    } else if (this.nonComplicanceService.nc.tiposParceiroItem == "Interno") {
      this.sectorService.put(this.nonComplicanceService.selected).subscribe(
        (value) => {
          this.sucess();
          this.sectorService.get().subscribe((data: any) => {
            this.nonComplicanceService.sectors = data.sectors;
          });
        },
        (err) => {
          this.providerService.get().subscribe((data: any) => {
            this.nonComplicanceService.sectors = data.sectors;
          });
          this.fail();
        }
      );
    }
  }

  sucess() {
    this.messageService.add({
      key: "myKey1",
      severity: "success",
      summary: "Dados editados com sucesso.",
      life: 3000,
    });
    this.nonComplicanceService.isSelected = false;
    this.nonComplicanceService.pesquisar = "";
    this.hideDialog();
  }

  fail() {
    this.messageService.add({
      key: "myKey1",
      severity: "error",
      summary: "Houve um problema ao editar os dados.",
      life: 3000,
    });
    this.nonComplicanceService.pesquisar = "";
    this.nonComplicanceService.isSelected = false;
    this.hideDialog();
  }

  ngOnInit(): void {}
}
