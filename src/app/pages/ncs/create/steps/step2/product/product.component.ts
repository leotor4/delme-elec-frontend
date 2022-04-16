import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";

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

  @Output() hasSelectedProductEvent: EventEmitter<boolean> = new EventEmitter();

  products = [
    {
      sap: "9083144551",
      name: "Caixa de Pandora",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
    {
      sap: "31232324551",
      name: "test1",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
    {
      sap: "23213421321",
      name: "test2",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
    {
      sap: "12344551",
      name: "test3",
      description:
        "lorem dhasdhsa dhsadhasdas dsa dasdqewd ewq ewq dasdsadqwdqdwq",
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getFilteredList(event: any) {
    let filtered: any[] = [];
    let query = event.query;

    this.products.map((product) => {
      if (
        product.name?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        product.description?.toLowerCase().indexOf(query.toLowerCase()) == 0 ||
        product.sap.toLowerCase().indexOf(query.toLowerCase()) == 0
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
