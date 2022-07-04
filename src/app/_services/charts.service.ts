import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NonCompliance } from "../models/non-compliance";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product.model";
import { Sector } from "../models/sector";

@Injectable({
  providedIn: "root",
})
export class ChartsService {
  apiUrl = environment.apiURL;
  ncs: NonCompliance[] = [];
  products: Product[] = [];
  sectors: string[] = [];

  get(): Observable<NonCompliance[]> {
    return this.http.get<NonCompliance[]>(this.apiUrl + "noncompliances");
  }

  getSector(): Observable<NonCompliance[]> {
    return this.http.get<NonCompliance[]>(this.apiUrl + "sector");
  }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + "product");
  }

  constructor(private http: HttpClient) {}
}
