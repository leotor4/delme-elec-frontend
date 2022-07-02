import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NonCompliance } from "../models/non-compliance";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ChartsService {
  apiUrl = environment.apiURL + "noncompliances";
  ncs: NonCompliance[] = [];

  get(): Observable<NonCompliance[]> {
    return this.http.get<NonCompliance[]>(this.apiUrl);
  }

  getAllNcs(){
   
  }
  constructor(private http: HttpClient) {}
}
