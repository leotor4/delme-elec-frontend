import { Component, OnInit } from "@angular/core";
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
    public sectorService: SectorService,
    public nonComplicanceService: NonComplianceService
  ) {}

  customers: Customer[];
  sectors: Sector[];
  providers: Provider[];
  updates: UpdateDate;
  results: any[];

  public pesquisar: any;
  public selected: any = this.nonComplicanceService.selected;

  public tiposParceiro: Array<String> = ["Interno", "Cliente", "Fornecedor"];
  public isSelected = false;
  public parceiroIdent = false;
  public display = false;

  public editarNomeItem = "";
  public editarEmailItem = "";
  public editarTelefoneItem = "";

  search(event: any) {
    var filtro = event.query;
    this.results = [];

    if (this.nonComplicanceService.tiposParceiroItem == "Cliente") {
      this.customers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (this.nonComplicanceService.tiposParceiroItem == "Fornecedor") {
      this.providers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (this.nonComplicanceService.tiposParceiroItem == "Interno") {
      this.sectors.forEach((element) => {
        if (this.verificarExistenciaInterno(element, filtro)) {
          this.results.push(element);
        }
      });
    }
  }

  returnUpdateTime() {
    if (this.updates) {
      let dateAtt = new Date(this.updates.update_time);
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

  dataFormatada(data: Date) {
    let dia = data.getDate().toString().padStart(2, "0");
    let mes = (data.getMonth() + 1).toString().padStart(2, "0");
    let ano = data.getFullYear();
    console.log(dia + "/" + mes + "/" + ano);
    return dia + "/" + mes + "/" + ano;
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
    if (this.nonComplicanceService.tiposParceiroItem == "Interno") {
      return true;
    } else {
      return false;
    }
  }

  onSelected() {
    this.selected = this.pesquisar;
    this.editarNomeItem = this.selected.responsible_name;
    this.editarTelefoneItem = this.selected.responsible_phone;
    this.editarEmailItem = this.selected.responsible_email;
    this.isSelected = true;
  }

  onChange() {
    this.pesquisar = "";
    this.isSelected = false;
  }

  onChangeAutoComplete() {
    console.log(this.pesquisar);
    if (this.pesquisar == "") {
      this.isSelected = false;
    }
  }

  showDialog() {
    this.display = true;
  }
  hideDialog() {
    this.display = false;
  }

  editar() {
    this.selected.responsible_name = this.editarNomeItem;
    this.selected.responsible_phone = this.editarTelefoneItem;
    this.selected.responsible_email = this.editarEmailItem;
    if (this.nonComplicanceService.tiposParceiroItem == "Cliente") {
      this.customerService.put(this.selected).subscribe((data: any) => {
        this.customerService.get();
      });
    } else if (this.nonComplicanceService.tiposParceiroItem == "Fornecedor") {
      this.providerService.put(this.selected).subscribe((data: any) => {
        this.providerService.get();
      });
    }
  }

  ngOnInit(): void {
    this.customerService.get().subscribe((data: any) => {
      this.customers = data.customers;
    });

    this.updateService.get().subscribe((data: any) => {
      this.updates = data.Updatedate[0];
    });

    this.sectorService.get().subscribe((data: any) => {
      this.sectors = data.sectors;
    });

    this.providerService.get().subscribe((data: any) => {
      this.providers = data.providers;
    });
  }
}
