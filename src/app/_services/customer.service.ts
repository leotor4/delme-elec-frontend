import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../models/customer";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  apiUrl = environment.apiURL + "customer";

  constructor(private http: HttpClient) {}

  post(json: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.parse(json));
  }

  put(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl + "/" + customer.id, customer);
  }

  get(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
