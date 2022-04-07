import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  apiUrl = "http://localhost:3333/customer";

  constructor(private http: HttpClient) {}

  post(json: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.parse(json));
  }
}
