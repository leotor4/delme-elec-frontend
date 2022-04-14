import { Component, OnInit } from "@angular/core";
import { elementAt } from "rxjs";
import { Customer } from "src/app/models/customer";
import { Provider } from "src/app/models/provider";
import { CustomerService } from "src/app/_services/customer.service";
import { ProviderService } from "src/app/_services/provider.service";

@Component({
  selector: "app-parceiro",
  templateUrl: "./parceiro.component.html",
  styleUrls: ["./parceiro.component.css"],
})
export class ParceiroComponent implements OnInit {
  constructor(
    public customerService: CustomerService,
    public providerService: ProviderService
  ) {}

  customers!: Customer[];
  providers: Provider[];
  results: any[];

  public pesquisar: any;
  public selected: any;

  public tiposParceiro: Array<String> = ["Interno", "Cliente", "Fornecedor"];
  public isSelected = false;
  public parceiroIdent = false;
  public display = false;

  public tiposParceiroItem = "";
  public editarNomeItem = "";
  public editarEmailItem = "";
  public editarTelefoneItem = "";

  search(event: any) {
    var filtro = event.query;
    this.results = [];

    if (this.tiposParceiroItem == "Cliente") {
      this.customers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    } else if (this.tiposParceiroItem == "Fornecedor") {
      this.providers.forEach((element) => {
        if (this.verificarExistencia(element, filtro)) {
          this.results.push(element);
        }
      });
    }
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

  onSelected() {
    this.selected = this.pesquisar;
    this.editarNomeItem = this.selected.responsible_name;
    this.editarTelefoneItem = this.selected.responsible_phone;
    this.editarEmailItem = this.selected.responsible_email;
    this.isSelected = true;
  }

  showDialog() {
    this.display = true;
  }

  editar() {
    this.selected.responsible_name = this.editarNomeItem;
    this.selected.responsible_phone = this.editarTelefoneItem;
    this.selected.responsible_email = this.editarEmailItem;
    if (this.tiposParceiroItem == "Cliente") {
      this.customerService.put(this.selected).subscribe((data: any) => {
        this.customerService.get();
        console.log(data);
      });
    } else if (this.tiposParceiroItem == "Fornecedor") {
      this.providerService.put(this.selected).subscribe((data: any) => {
        this.providerService.get();
        console.log(data);
      });
    }
  }

  ngOnInit(): void {
    this.customerService.get().subscribe((data: any) => {
      this.customers = data.customers;
    });

    this.providerService.get().subscribe((data: any) => {
      this.providers = data.providers;
    });
  }
}
