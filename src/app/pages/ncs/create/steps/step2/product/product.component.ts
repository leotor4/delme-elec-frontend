import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { UpdateDate } from "src/app/models/update-date";
import { NonComplianceService } from "src/app/_services/non-compliance.service";
import { ProductService } from "src/app/_services/product.service";
import { UpdateDateService } from "src/app/_services/update-date.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  results: Product[];

  products: Product[];
  updates: UpdateDate;

  constructor(
    private productService: ProductService,
    public updateService: UpdateDateService,
    public nonComplicanceService: NonComplianceService
  ) {}

  ngOnInit(): void {
    this.getProducts();
    this.updateService.get().subscribe((data: any) => {
      this.updates = data.Updatedate[0];
    });
  }

  getProducts(): void {
    this.productService.get().subscribe((data: any) => {
      this.products = data.products;
    });
  }
  getFilteredList(event: any) {
    var filtro = event.query.normalize('NFKD').replace(/[^\w]/g, '');
    this.results = [];

    this.products.forEach((element) => {
      if (this.verificarExistencia(element, filtro)) {
        this.results.push(element);
      }
    });
  }
  verificarExistencia(element: Product, filtro: string): boolean {
    return element.name?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro.toUpperCase()) ||
        element.code?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro.toUpperCase()) ||
        element.description?.normalize('NFKD').replace(/[^\w]/g, '').toUpperCase().includes(filtro.toUpperCase());
  }

  checkProduct(Product: Product) {
    this.nonComplicanceService.nc.product = Product;
  }
  uncheckProduct() {}

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
}
