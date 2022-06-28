import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  apiUrl = environment.apiURL + "product";

  constructor(private http: HttpClient) {}

  post(json: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.parse(json));
  }
  get(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
