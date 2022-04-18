import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { ProductService } from "src/app/_services/product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  radioButtonValue: string = "val1";
  autoCompleteValue: string;
  hasSelectedProduct: boolean;
  results: Product[];
  selectedProduct: Product;
  products: Product[];
  @Output() hasSelectedProductEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.get().subscribe((data: any) => {
      this.products = data.products;
    });
  }
  getFilteredList(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    this.products.map((product) => {
      if (
        product.name?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        product.description?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        product.code.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(product);
      }
      this.results = filtered;
    });
  }

  checkProduct(Product: Product) {
    this.hasSelectedProduct = true;
    this.hasSelectedProductEvent.emit(this.hasSelectedProduct);
    this.selectedProduct = Product;
  }
  uncheckProduct() {
    this.hasSelectedProduct = false;
    this.hasSelectedProductEvent.emit(this.hasSelectedProduct);
  }
}
