import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { Procedure } from "../models/procedure";

@Injectable({
  providedIn: "root",
})
export class ProcedureService {
  apiUrl = environment.apiURL + "procedures";
  constructor(private http: HttpClient) {}

  post(procedure: Procedure, file: any) {
    let formData = new FormData();
    formData.append("data", JSON.stringify(procedure));
    formData.append("file", file);
    return this.http.post(this.apiUrl, formData);
  }

  get(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(this.apiUrl);
  }
}
