import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Place } from "../models/place";

@Injectable({
  providedIn: "root",
})
export class PlaceService {
  apiUrl = environment.apiURL + "place";
  constructor(private http: HttpClient) {}

  get(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
  }
}
