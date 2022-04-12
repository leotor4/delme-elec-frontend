import { Component, OnInit } from "@angular/core";
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

  customers: Customer[];
  providers: Provider[];

  public tiposParceiro: Array<String> = ["Interno", "Cliente", "Fornecedor"];

  public tiposParceiroItem = "";

  public pesquisar = "";

  public parceiroIdent = false;

  ngOnInit(): void {
    this.customerService.get().subscribe((data: Customer[]) => {
      this.customers = data;
    });

    this.providerService.get().subscribe((data: Provider[]) => {
      this.providers = data;
      console.log(data);
    });
  }
}
