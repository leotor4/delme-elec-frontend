import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Provider } from "../models/provider";

@Injectable({
  providedIn: "root",
})
export class ProviderService {
  apiUrl = "http://localhost:3333/provider";

  constructor(private http: HttpClient) {}

  post(data: string): Observable<Provider> {
    return this.http.post<Provider>(this.apiUrl, JSON.parse(data));
  }
  put(provider: Provider): Observable<Provider> {
    return this.http.put<Provider>(this.apiUrl + "/" + provider.id, provider);
  }
  get(): Observable<Provider[]> {
    return this.http.get<Provider[]>(this.apiUrl);
  }
}
