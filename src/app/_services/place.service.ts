import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Place } from "../models/place";

@Injectable({
  providedIn: "root",
})
export class PlaceService {
  apiUrl = "http://localhost:3333/place";
  constructor(private http: HttpClient) {}

  get(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
  }
}
