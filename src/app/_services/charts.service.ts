import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NonCompliance } from "../models/non-compliance";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class ChartsService {
  apiUrl = environment.apiURL;
  ncs: NonCompliance[] = [];
  products: Product[] = [];

  get(): Observable<NonCompliance[]> {
    return this.http.get<NonCompliance[]>(this.apiUrl + "noncompliances");
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + "product");
  }


  constructor(private http: HttpClient) {}
}
