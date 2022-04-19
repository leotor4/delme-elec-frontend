import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Sector } from "../models/sector";

@Injectable({
  providedIn: "root",
})
export class SectorService {
  apiUrl = "http://localhost:3333/sector";
  constructor(private http: HttpClient) {}

  get(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.apiUrl);
  }
}
