import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from "../models/customer";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  public customers!: Customer[];
  apiUrl = "http://localhost:3333/customer";

  constructor(private http: HttpClient) {}

  post(json: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.parse(json));
  }

  get(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }
}
