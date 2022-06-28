import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Sector } from "../models/sector";

@Injectable({
  providedIn: "root",
})
export class SectorService {
  apiUrl = environment.apiURL + "sector";
  constructor(private http: HttpClient) {}

  get(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.apiUrl);
  }

  put(sector: Sector): Observable<Sector> {
    return this.http.put<Sector>(this.apiUrl + "/" + sector.id, sector);
  }
}
