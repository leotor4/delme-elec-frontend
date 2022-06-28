import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { UpdateDate } from "../models/update-date";

@Injectable({
  providedIn: "root",
})
export class UpdateDateService {
  apiUrl = environment.apiURL + "updateDate";
  constructor(private http: HttpClient) {}

  get(): Observable<UpdateDate[]> {
    return this.http.get<UpdateDate[]>(this.apiUrl);
  }
}
